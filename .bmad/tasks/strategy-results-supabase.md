# STRATEGIC RESULTS: SUPABASE VENDING MACHINE BACKEND

**Date**: 2026-03-11
**Role**: Expert Startup CTO & Supabase Architect
**Status**: 🔵 Architecture Ready for Implementation

---

## 1. Database Schema Setup

### Table: `entries`

Stores every email submission and its outcome. One row per unique email.

```sql
CREATE TABLE entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  prize_tier INT NOT NULL CHECK (prize_tier IN (1, 2, 3)),
  prize_label TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Index for fast duplicate-email lookups
CREATE INDEX idx_entries_email ON entries (email);
```

| Column | Type | Purpose |
|--------|------|---------|
| `id` | UUID | Primary key |
| `email` | TEXT (UNIQUE) | Prevents duplicate entries at DB level |
| `prize_tier` | INT | 1 = Legendary, 2 = Rare, 3 = Common |
| `prize_label` | TEXT | Human-readable: "Vinyl Record", "VIP Remix Pass", "Soundpack Drop" |
| `created_at` | TIMESTAMPTZ | Audit trail |

### Table: `inventory`

Single-row table tracking the hard cap on Tier 1 vinyl records.

```sql
CREATE TABLE inventory (
  id TEXT PRIMARY KEY DEFAULT 'vinyl',
  total_cap INT NOT NULL DEFAULT 100,
  remaining INT NOT NULL DEFAULT 100,
  CONSTRAINT remaining_non_negative CHECK (remaining >= 0)
);

-- Seed the single inventory row
INSERT INTO inventory (id, total_cap, remaining) VALUES ('vinyl', 100, 100);
```

| Column | Type | Purpose |
|--------|------|---------|
| `id` | TEXT | Always `'vinyl'` — single-row pattern |
| `total_cap` | INT | Original cap (100), immutable reference |
| `remaining` | INT | Decremented atomically on each Tier 1 win |

### Row Level Security (RLS)

**Critical**: The client must never read inventory counts or other users' entries directly.

```sql
-- Enable RLS on both tables
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

-- ENTRIES: No client-side access at all.
-- All reads/writes happen through the Edge Function using the service_role key.
-- No RLS policies = default deny for anon/authenticated roles.

-- INVENTORY: Same — no client access.
-- No RLS policies = default deny.
```

> 🔵 **Why no policies?** The Edge Function uses the `service_role` key which bypasses RLS entirely. The anon key (used by the frontend Supabase client) has zero access to these tables. This is the most secure pattern — zero attack surface from the client.

---

## 2. Supabase Edge Function: `vend`

### File: `supabase/functions/vend/index.ts`

```typescript
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
      // UPDATE ... SET remaining = remaining - 1 WHERE remaining > 0
      // This is atomic — two concurrent requests cannot both succeed
      // if only 1 vinyl remains.
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
```

### Atomic Inventory Decrement: Postgres RPC Function

This is the critical piece that prevents race conditions on the vinyl cap.

```sql
CREATE OR REPLACE FUNCTION decrement_vinyl()
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
  rows_affected INT;
BEGIN
  UPDATE inventory
  SET remaining = remaining - 1
  WHERE id = 'vinyl' AND remaining > 0;

  GET DIAGNOSTICS rows_affected = ROW_COUNT;
  RETURN rows_affected > 0;
END;
$$;
```

**Why this is race-condition-proof:**

| Concern | Solution |
|---------|----------|
| Two users roll Tier 1 simultaneously | `UPDATE ... WHERE remaining > 0` is atomic in Postgres. Only one `UPDATE` succeeds when `remaining = 1`. The other gets `ROW_COUNT = 0` and falls back to Tier 2. |
| Client spoofing a "Legendary" roll | Impossible — RNG happens server-side in the Edge Function. Client only receives the result. |
| Client directly writing to `entries` | RLS denies all client access. Only `service_role` can write. |
| Duplicate email via race condition | `UNIQUE` constraint on `entries.email` + `23505` error handling catches any edge case the initial `SELECT` misses. |

---

## 3. Frontend Integration Strategy

### 3a. Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### 3b. Supabase Client Init

Create `src/lib/supabase.ts`:

```typescript
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

> 🔵 The anon key is safe to expose — RLS denies all direct table access. The key only authenticates requests to the Edge Function.

### 3c. Environment Variables

Create `.env` (add to `.gitignore`):

```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

### 3d. Integration in App.tsx

Wire the existing "Break the Loop" email input to state and the Edge Function.

```typescript
// State
const [email, setEmail] = useState("");
const [vendState, setVendState] = useState<
  "idle" | "loading" | "won" | "already" | "error"
>("idle");
const [prize, setPrize] = useState<{ tier: number; label: string } | null>(null);

// Handler
const handleVend = async () => {
  if (!email.trim()) return;
  setVendState("loading");

  try {
    const { data, error } = await supabase.functions.invoke("vend", {
      body: { email: email.trim() },
    });

    if (error) throw error;

    if (data.error === "already_entered") {
      setVendState("already");
      if (data.prize_tier) setPrize({ tier: data.prize_tier, label: data.prize_label });
      return;
    }

    if (data.success) {
      setPrize({ tier: data.prize_tier, label: data.prize_label });
      setVendState("won");
    }
  } catch {
    setVendState("error");
  }
};
```

### 3e. UI State Rendering

| `vendState` | What to show |
|-------------|-------------|
| `idle` | Email input + "Claim Your Copy" button |
| `loading` | Disable input, show spinner or vending animation (use existing Framer Motion) |
| `won` | Tier-specific animation: gold burst for Tier 1, purple glow for Tier 2, white flash for Tier 3. Show `prize.label` text. |
| `already` | "You've already entered! Your prize: {label}" message |
| `error` | "Something went wrong. Try again." with retry button |

### 3f. Animation Approach

Leverage the existing **Framer Motion** dependency for prize reveal:

```tsx
<AnimatePresence mode="wait">
  {vendState === "won" && prize && (
    <motion.div
      key="prize-reveal"
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {/* Tier-specific content */}
    </motion.div>
  )}
</AnimatePresence>
```

---

## 4. Deployment Checklist

| Step | Command / Action |
|------|-----------------|
| 1. Create Supabase project | [dashboard.supabase.com](https://dashboard.supabase.com) |
| 2. Run schema migrations | Execute the SQL blocks from Section 1 in the SQL Editor |
| 3. Create the RPC function | Execute the `decrement_vinyl` SQL from Section 2 |
| 4. Deploy Edge Function | `supabase functions deploy vend` |
| 5. Set Edge Function secrets | `supabase secrets set SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=...` |
| 6. Add `.env` to frontend | `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` |
| 7. Install client SDK | `npm install @supabase/supabase-js` |
| 8. Wire up App.tsx | Add state, handler, and UI states per Section 3 |
| 9. Test locally | `supabase functions serve vend` + `npm run dev` |
| 10. Verify inventory cap | Submit 101+ test entries and confirm Tier 1 stops at 100 |

---

## 5. Security Summary

| Attack Vector | Mitigation |
|---------------|-----------|
| Client inspects code, spoofs Tier 1 | RNG is server-side only. Client sends email, receives result. |
| Direct table manipulation via anon key | RLS enabled, zero policies = default deny for anon role |
| Race condition on vinyl inventory | Atomic `UPDATE ... WHERE remaining > 0` in Postgres RPC |
| Duplicate email via concurrent requests | `UNIQUE` constraint + `23505` error code handling |
| Email enumeration | 409 response is intentional (user needs feedback). Rate limiting via Supabase's built-in Edge Function limits mitigates scraping. |
| Service role key exposure | Key lives only in Edge Function env vars, never sent to client |

---

> ✅ **This architecture is ready for immediate implementation.** All SQL is copy-paste ready for the Supabase SQL Editor. The Edge Function is deployable as-is. The frontend integration slots directly into the existing React + Framer Motion + Tailwind stack.
