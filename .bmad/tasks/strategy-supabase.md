# STRATEGIC BACKEND ARCHITECTURE: SUPABASE VENDING MACHINE
**Role**: Expert Startup CTO & Supabase Architect

## Context
We are building the "Superloop" landing page. At the bottom of the page, there is a literal "Vending Machine" component (`Break the Loop`). When a user submits their email address into the input field, they trigger a Sweepstakes interaction based on raw chance.

### The Gamified Vending Sweepstakes Rules
1. Every valid email submission receives exactly **one** prize. 
2. Users cannot enter the same email address twice to trigger another pull.
3. The prize tiers and probabilities are strictly governed:
   - **Tier 3 (Common - 70%):** Free digital Soundpack Drop (Unlimited Inventory)
   - **Tier 2 (Rare - 25%):** VIP Remix Week Pass (Unlimited Inventory)
   - **Tier 1 (Legendary - 5%):** Rare Physical Vinyl Record (Strictly capped at 100 max globally)

## The Mission
We need you to architect the Supabase backend for this system. Security is paramount: users cannot be allowed to inspect the client-side code and spoof a 'Legendary' roll, nor can they bypass the 100 inventory cap on the vinyl records due to race conditions. The randomness must occur securely on the backend.

## Instructions
Please generate the comprehensive technical architecture and write it to `.bmad/tasks/strategy-results-supabase.md`.

Your output must structurally include:
1. **Database Schema Setup**: Exactly what tables (`entries`, `prizes`, `inventory`?) do we need to track emails, timestamps, the prize won, and the hard inventory count of the 100 vinyls? Include Row Level Security (RLS) configurations.
2. **Supabase Edge Function Logic**: We cannot do the RNG on the client. Outline (or write the TypeScript pseudo-code for) a Supabase Edge Function that:
   - Receives the user's email.
   - Verifies the email hasn't been used.
   - Calculates the weighted random chance (70/25/5).
   - If rolling for the 5% Vinyl, it *must* reliably check the current inventory table. If the inventory is at 0, it should gracefully fall back to forcing a Tier 2 Pass instead.
   - If winning the Vinyl, securely decrements the global inventory by 1 (handling race conditions).
   - Returns the securely processed result to the React client.
3. **Frontend Integration Strategy**: A brief guide on how the React app (`App.tsx`) handles loading states and parses the result from the Edge Function to show the winning animation.

Output this strictly to `.bmad/tasks/strategy-results-supabase.md`. Make it highly actionable so the developer can immediately execute the database migrations.
