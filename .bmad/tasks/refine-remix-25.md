# STRATEGIC EXECUTION: FRONTEND REACT SUPABASE INTEGRATION
**Role**: Expert Frontend Developer & React/Framer Motion Architect

## Context
Phase 1 is complete: the Supabase Edge Function (`vend`) is deployed and fully operational. It takes an email, rolls a weighted 70/25/5 Sweepstakes ticket against the `inventory` table, and returns a JSON payload.

Now, we need to rewrite the main `App.tsx` file to natively integrate this live endpoint into the "Break the Loop" Vending Machine at the bottom of the page.

## Instructions
Please carefully parse `src/App.tsx`. You will find a placeholder input field and button in the 'Vending Machine' section at the bottom.

### 1. State Machine
Inject the following state hooks into `App`:
```tsx
const [email, setEmail] = useState("");
const [vendState, setVendState] = useState<"idle" | "loading" | "won" | "already" | "error">("idle");
const [prize, setPrize] = useState<{ tier: number; label: string } | null>(null);
```

### 2. The Submission Handler
Write the `handleVend` function inside `App.tsx`:
- It should call `await supabase.functions.invoke('vend', { body: { email: email.trim() } })`.
- Update `vendState` and `prize` accordingly. The endpoint returns `success: true` or `error: 'already_entered'` / `error: 'Internal server error'`.
- You will need to import the client from `src/lib/supabase.ts`.

### 3. Vending Machine UI States
Update the Vending Machine JSX:
- Bind the input to `email`.
- While `loading`, disable the button and show an animated "PROCESSING..." state.
- If `vendState === 'won'`, use `<AnimatePresence>` and `framer-motion` to dramatically replace the input field with a massive WINNER reveal box. Make Tier 1 (Vinyl) glow gold, Tier 2 glow purple, Tier 3 glow white. Use the `prize.label`.
- If `vendState === 'already'`, show a friendly "You've already claimed your [prize.label]!" message.
- If `vendState === 'error'`, show a red error and allow them to try again.

### 4. Live JavaScript Countdowns
There are two static string placeholders on the page representing time:
1. `EXPIRES IN 03:24:00` (in the Remix Week subheader)
2. `LOCKED UNTIL 12AM` (on the Soundpacks)

Please replace these static strings with a real `setInterval` countdown timer that dynamically counts down to **Midnight tonight**. Make sure you clean up the interval on unmount.

## Output
Rewrite `src/App.tsx` directly to implement these changes. Only edit the relevant components/state, leave all the visual styling of the rest of the application exactly as it is (it is perfectly styled in phase 23).
