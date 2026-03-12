# STRATEGIC ROADMAP: SUPERLOOP MVP LAUNCH

**Date**: 2026-03-11
**Role**: Expert Startup PM & Technical Architect
**Status**: 🟡 Execution Phase — All Architecture Finalized, Zero Code Deployed

---

## Project State Assessment

| Asset | Status |
|-------|--------|
| Frontend UI (React + Tailwind + Framer Motion) | ✅ 23 iterations complete, production-polished |
| Sweepstakes Legal Compliance (footer/disclaimers) | ✅ Shipped |
| Supabase Backend Architecture (`strategy-results-supabase.md`) | ✅ Fully designed, copy-paste ready |
| Supabase Cloud Instance | 🔴 Not created |
| Frontend ↔ Backend wiring | 🔴 Not started |
| Vercel deployment | 🔴 Not linked |
| Ronin Record 3D video asset | 🔴 Not generated |
| Countdown timers (live JS) | 🔴 Static placeholder |

**Bottom line**: The hard thinking is done. What remains is execution — standing up infrastructure, wiring connections, and generating one hero media asset.

---

## PHASE 1: BACKEND INFRASTRUCTURE (Do First)

**Goal**: Get the Supabase backend live and testable in isolation before touching the frontend.

| # | Task | Detail | Estimate |
|---|------|--------|----------|
| 1.1 | **Create Supabase project** | Go to `dashboard.supabase.com`, create project, note down `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` | 5 min |
| 1.2 | **Run SQL migrations** | Execute the `entries` table, `inventory` table, RLS enable statements, and `decrement_vinyl` RPC function in the Supabase SQL Editor. All SQL is in `strategy-results-supabase.md` Sections 1–2. | 10 min |
| 1.3 | **Deploy the `vend` Edge Function** | Create `supabase/functions/vend/index.ts` locally, paste the function code from `strategy-results-supabase.md` Section 2, then deploy with `supabase functions deploy vend` | 15 min |
| 1.4 | **Set Edge Function secrets** | `supabase secrets set SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=...` | 2 min |
| 1.5 | **Smoke test via cURL** | Hit the Edge Function endpoint directly with a test email. Verify: 200 on first hit, 409 on duplicate, weighted tier distribution over ~20 requests. | 10 min |

**Phase 1 gate**: You can `curl` the `vend` endpoint and get a valid JSON prize response. Backend works independently of frontend.

---

## PHASE 2: FRONTEND WIRING (Do Second)

**Goal**: Connect the existing "Break the Loop" UI to the live Supabase Edge Function.

| # | Task | Detail |
|---|------|--------|
| 2.1 | **Install Supabase client** | `npm install @supabase/supabase-js` |
| 2.2 | **Create `src/lib/supabase.ts`** | Init the client with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` env vars |
| 2.3 | **Create `.env`** | Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Verify `.env` is in `.gitignore`. |
| 2.4 | **Wire `handleVend` in App.tsx** | Add state (`email`, `vendState`, `prize`), connect the email input's `onChange` and button's `onClick`, call `supabase.functions.invoke("vend", ...)` |
| 2.5 | **Implement UI state rendering** | `idle` → input + CTA, `loading` → spinner/animation, `won` → tier-specific reveal with Framer Motion, `already` → friendly duplicate message, `error` → retry prompt |
| 2.6 | **Wire countdown timers** | Replace static "Locked Until 12AM" placeholders with real `setInterval`-based countdown logic targeting midnight ET daily reset (or your chosen unlock cadence) |

**Phase 2 gate**: User types email on localhost, clicks "Claim Your Copy", sees a real prize reveal animation backed by live Supabase data.

---

## PHASE 3: HERO MEDIA ASSET (Parallel with Phase 2)

**Goal**: Generate the final looping 3D "Ronin Record" video for the vinyl hero section.

| # | Task | Detail |
|---|------|--------|
| 3.1 | **Draft Veo 3.1 prompt** | Describe the spinning vinyl record with the Superloop branding, neon lighting, and seamless loop. Aim for 4-8 second loop. |
| 3.2 | **Generate + iterate in Google Veo** | Run 3-5 generations, pick the best loop. Focus on: clean loop point, no artifacts, dramatic lighting. |
| 3.3 | **Export and optimize** | Convert to WebM (VP9) for web. Target < 5MB for fast loading. Create a poster frame (first frame as `.webp`) for instant paint. |
| 3.4 | **Drop into frontend** | Replace any placeholder vinyl visual with the `<video autoPlay muted loop playsInline>` element. |

> 🔵 **This phase is independent of Phases 1–2.** Run it in parallel. Hand off the final `.webm` file whenever it's ready.

---

## PHASE 4: DEPLOYMENT & PUBLIC TESTING (Do Last)

**Goal**: Ship to a public URL for real-world testing before any marketing push.

| # | Task | Detail |
|---|------|--------|
| 4.1 | **Link repo to Vercel** | Connect the GitHub repo → Vercel. Set framework to Vite. Add env vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) in Vercel project settings. |
| 4.2 | **Verify production build** | Run `npm run build` locally first to catch any TypeScript or build errors before Vercel attempts it. |
| 4.3 | **Deploy to Vercel preview** | Push to a feature branch, verify the preview deployment works end-to-end (email → Edge Function → prize reveal). |
| 4.4 | **End-to-end QA checklist** | See table below. |
| 4.5 | **Custom domain (optional)** | Point your domain's DNS to Vercel if you want a branded URL for the launch. |

### QA Checklist

| Test Case | Expected Result |
|-----------|----------------|
| Submit valid email | Prize reveal animation, tier 1/2/3 |
| Submit same email again | "Already entered" message with original prize |
| Submit invalid email | Client-side or server-side validation error |
| Submit 101+ unique emails | Tier 1 vinyl stops awarding after 100, graceful Tier 2 fallback |
| Mobile viewport | Full responsive layout, touch-friendly CTA |
| Slow network (throttle in DevTools) | Loading state visible, no double-submit |
| Legal footer links | All sweepstakes disclosure links functional |
| Countdown timer | Ticks down accurately, resets at target time |

---

## Execution Priority Matrix

| Priority | Phase | Why This Order |
|----------|-------|---------------|
| **P0** | Phase 1 — Backend infra | Everything depends on a live Supabase endpoint. No frontend work is testable without it. |
| **P0** | Phase 2 — Frontend wiring | Core product loop: email → prize. This IS the MVP. |
| **P1** | Phase 3 — Hero video | Visual polish. Important for conversion but not a functional blocker. Run in parallel. |
| **P2** | Phase 4 — Vercel deploy | Only matters once Phases 1+2 are working locally. |

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Supabase Edge Function cold start latency | Medium | Low | Add a loading animation (already planned) — users expect 1-2s on a "vending machine" interaction |
| Veo 3.1 can't produce a clean seamless loop | Medium | Low | Fallback: use a static 3D render or CSS-animated vinyl graphic. The product works without video. |
| Rate limiting / abuse on the `vend` endpoint | Low | Medium | Supabase Edge Functions have built-in rate limits. Add client-side debounce on the button. For MVP this is sufficient. |
| `.env` accidentally committed to git | Low | High | Verify `.gitignore` includes `.env` BEFORE the first commit with env vars. |

---

## TL;DR — Your Next 3 Moves

1. **Open Supabase dashboard** → create project → run the SQL from `strategy-results-supabase.md` → deploy the `vend` Edge Function → smoke test with cURL
2. **`npm install @supabase/supabase-js`** → create `src/lib/supabase.ts` → wire `handleVend` into App.tsx → see prizes land in the Supabase `entries` table
3. **Link to Vercel** → deploy → share the URL → collect emails

The architecture is airtight. The frontend is polished. Now ship it.

---

> ✅ **Strategic assessment complete.** All phases are actionable today. Phase 1 can be completed in under 30 minutes by following the existing SQL and Edge Function code in `strategy-results-supabase.md`.
