# STRATEGIC EXECUTION: MICRO-ANIMATIONS & MOBILE POLISH
**Role**: Expert Frontend Developer & UI/UX Motion Architect

## Context
Our project (`App.tsx`) currently features a stunning, high-contrast, Swiss grid editorial layout (`voltage-mag-1` architecture). It works perfectly, and the Supabase sweeping logic is fully hooked up. 

The user wants to elevate the premium "feel" of the website by injecting tasteful micro-animations using **Anime.js** (which has just been reinstalled) and ensuring the mobile viewport styling is totally flawless, all **WITHOUT changing the overall layout or visual design**.

## Instructions
Please carefully parse and rewrite `src/App.tsx` to implement the following upgrades:

### 1. Anime.js Micro-Interactions
Import `anime` from `animejs`. Inject subtle, premium physics to key interactive nodes using `onMouseEnter` / `onMouseLeave` / `onClick` or `useEffect` mount sequences.
*   **The Soundpack Depot Buttons:** When hovering over the 3 available soundpack rows (A-01, A-02, B-01), use Anime.js to create a very subtle elastic hover scale effect (e.g. `scale: [1, 1.02]`) or a sleek timeline animation that flashes the background or slides the text slightly.
*   **The Navigation Links:** Animate the "->" arrow sliding in or the text tracking expanding slightly via Anime.js when hovering the left sidebar links.
*   **Initial Load Entry:** Consider adding a single, extremely fast, sleek Anime.js stagger to the main main grid items when the page first loads, sliding them up `+10px` and fading `opacity` from 0 to 1 over `400ms`. Do NOT make this slow or annoying; it should feel razor sharp.

### 2. Framer Motion Refinement
*   The Vending Machine input currently uses `framer-motion` for the huge prize reveal. Ensure it feels violently fast and bouncy (high stiffness spring). 
*   *Note: Do NOT wrap the `<input>` element itsely in `AnimatePresence`. Only animate the winner states (as it is currently written) to avoid React re-render freezing.*

### 3. Mobile Responsiveness Audit
The layout uses desktop-specific CSS Grid rules (`md:grid-cols-[14rem_1fr_4rem]`). Check the behavior on `sm` and `xs` screens.
*   Ensure the Hero text ("SYNTHETIC DREAMS") scales down properly and doesn't break horizontal scrolling.
*   Ensure the "Remix Now" 2-column section stacks elegantly into 1-column on mobile.
*   Ensure the "Break the Loop" Vending capture box takes full width on mobile and isn't cut off.

## CRITICAL RULES
1. **DO NOT change the overall look, color scheme, or base layout of the page.** The visual design is locked. We are purely adding *motion* and *mobile responsiveness*.
2. Write perfectly typed React/TypeScript. Use `useRef` arrays or selectors cleanly if attaching Anime.js timelines.
3. If you add entrance animations, ensure they do not break the CSS grid layout.

## Output
Produce the fully optimized `src/App.tsx` file. State exactly what you animated and what mobile fixes you applied.
