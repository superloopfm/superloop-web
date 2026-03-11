# SUPERLOOP WIDE LANDING PAGE DIRECTIVE
**Role**: Expert Frontend Developer (Tailwind CSS/React).

## Context
We are executing a full "clean slate" rebuild of `src/App.tsx`. The user wants to perfectly replicate the design of a specific HTML prototype but make it fluid, wide, and scalable across any screen size.

## Assignment
1. Open `/Users/draskomacpro/PROJECTS/SUPERLOOP/projects - website/aura.build tests/aura.build projects/HOME PAGE/voltage-mag-1.html`.
2. **Total Rewrite**: Completely replace the contents of `src/App.tsx` with the structure from the prototype. Do not carry over any old code, components, or dark modes. This is a bright layout.
3. **Make it Wide & Scalable**:
   - The original prototype uses `<main class="... max-w-[1920px] mx-auto">`. Remove the `max-w-[1920px]` and `mx-auto` constraint so the grid extends infinitely to the edges of ultrawide monitors.
   - Retain the exact column structure (`grid-cols-[3rem_1fr_3rem] md:grid-cols-[4rem_1fr_4rem]`). This allows the fixed vertical sidebars to anchor the left and right edges, while the center content (`1fr`) scales infinitely with the window width.
4. **Exact Styling**: Beyond the max-width adjustment, retain the *exact* visual design. Inherit the `bg-zinc-50` background, the `.bg-noise` dither layer, identical typography (`text-[15vw]`), SVG annotation lines, and all the content (Signal/Flow, Audio Engineering Quarterly, MODU/LAR_, Block A/B/C). 
5. Convert all custom `<style>` elements and backgrounds into `src/index.css` `@layer utilities` or standard Tailwind Arbitrary Values. 
6. Convert `<i data-lucide="...">` tags to standard `lucide-react` imports (e.g., `<Aperture>`, `<QrCode>`).

Output a summary of the rewrite. Ensure TypeScript strictness.
