# STRATEGIC EXECUTION: REACT COMPONENT EXTRACTION
**Role**: Expert React Architect & Technical Debt Manager

## Context
Our project (`App.tsx`) is currently a massive 700+ line monolith. It contains the perfect Swiss grid UI (`voltage-mag-1` architecture), deeply integrated Supabase frontend logic, and intricate Anime.js/Framer.js micro-interactions.

To prepare for launching multi-page "Artist Studios" and "Leaderboards" using this exact same `voltage-mag-1` grid shell, we need to architecturally decapitate `App.tsx`.

## Instructions
Please scan `src/App.tsx` and aggressively modularize it by extracting standalone UI components into a new `src/components/` directory.

**Crucial Directive:** You must not change a single CSS class, animation parameter, or logic piece. The website must look and behave exactly 100% identically to how it does right now. This is a pure *refactor*.

### Proposed Component Extractions
Try to extract the following conceptual blocks into their own `.tsx` files inside `src/components/`, and then import them back into a much cleaner `App.tsx`:

1.  **`Navigation.tsx`**: The entire `<aside>` left sidebar containing the Superloop logo and the 5 interactive links.
2.  **`HeroHeader.tsx`**: The top row (`<!-- Row 1: Hero Video Header -->`) containing the SYNTHETIC DREAMS massive text and the looping background video.
3.  **`SoundpackDepot.tsx`**: The "Soundpack Content" selection menu with its internal state (if possible to lift up or encapsulate) and the Anime.js interactions.
4.  **`RemixFader.tsx`**: The "Remix Week" fader, knob, and MPC pads module.
5.  **`VendingMachine.tsx`**: The entire "Break The Loop" section at the bottom, including the input form, Supabase `handleVend` logic, and Framer Motion reveal states.
    *   *Note: Because `VendingMachine` contains complex Supabase logic, it's highly recommended to completely extract its state (`email`, `vendState`, `prize`) out of `App.tsx` and move it directly into `VendingMachine.tsx` where it belongs natively.*

### Architecture Rules
1.  **Types & Props**: If components need to communicate (e.g., `isPlaying` state between the `SoundpackDepot` and the Hero record), define very clean TypeScript interfaces for the props.
2.  **Imports**: Ensure you correctly update all icon imports (`lucide-react`) and animation imports (`animejs`, `framer-motion`) in the new files.
3.  **Supabase Connection**: Extracting `VendingMachine.tsx` will require ensuring it imports the `supabase` client correctly.

## Output
Write out exactly which files you created in `src/components/` and provide the final, ultra-clean `src/App.tsx` that stitches them all back together.
