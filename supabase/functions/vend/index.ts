import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VendResult {
    prize_tier: number;
    prize_label: string;
}

serve(async (req: Request) => {
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { email } = await req.json();

        // ── 1. Validate email ──────────────────────────────────
        if (!email || typeof email !== "string") {
            return new Response(
                JSON.stringify({ error: "Email is required." }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        const normalizedEmail = email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(normalizedEmail)) {
            return new Response(
                JSON.stringify({ error: "Invalid email format." }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        // ── 2. Init Supabase with service_role (bypasses RLS) ──
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

        // ── 3. Check for duplicate email ───────────────────────
        const { data: existing } = await supabase
            .from("entries")
            .select("prize_tier, prize_label")
            .eq("email", normalizedEmail)
            .maybeSingle();

        if (existing) {
            return new Response(
                JSON.stringify({ error: "already_entered", prize_tier: existing.prize_tier, prize_label: existing.prize_label }),
                { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        // ── 4. Weighted random roll (server-side RNG) ──────────
        const roll = Math.random() * 100; // 0–99.999...
        let result: VendResult;

        if (roll < 5) {
            // ── 5. Tier 1 attempt: atomic inventory decrement ────
            const { data: decremented, error: invError } = await supabase
                .rpc("decrement_vinyl");

            if (invError || !decremented) {
                // Inventory exhausted — graceful fallback to Tier 2
                result = { prize_tier: 2, prize_label: "VIP Remix Week Pass" };
            } else {
                result = { prize_tier: 1, prize_label: "Rare Physical Vinyl Record" };
            }
        } else if (roll < 30) {
            // 5–29.999 = 25%
            result = { prize_tier: 2, prize_label: "VIP Remix Week Pass" };
        } else {
            // 30–99.999 = 70%
            result = { prize_tier: 3, prize_label: "Free Soundpack Drop" };
        }

        // ── 6. Insert entry ────────────────────────────────────
        const { error: insertError } = await supabase.from("entries").insert({
            email: normalizedEmail,
            prize_tier: result.prize_tier,
            prize_label: result.prize_label,
        });

        if (insertError) {
            // UNIQUE constraint violation = race condition duplicate
            if (insertError.code === "23505") {
                return new Response(
                    JSON.stringify({ error: "already_entered" }),
                    { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
                );
            }
            throw insertError;
        }

        // ── 7. Return result ───────────────────────────────────
        return new Response(
            JSON.stringify({ success: true, ...result }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );

    } catch (err) {
        console.error("vend error:", err);
        return new Response(
            JSON.stringify({ error: "Internal server error." }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
});
