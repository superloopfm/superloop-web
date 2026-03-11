# HERO & SUPPLY DEPOT REFINEMENT
**Role**: Expert Frontend Developer (Tailwind CSS/React)

## Context
The user wants to refine the new wide landing page. Specifically, we are replacing the main studio image with an oversized version of the dark "Synthetic Dreams" tracker, shrinking the top navigation to maximize hero space, updating the site title, and replacing the bottom-right "In This Issue" list with a custom "Supply Depot" extracted from a new prototype.

## Assignment
Execute the following updates within `src/App.tsx`:

### 1. Update Header / Navigation
- Locate the `<header>` element at the top of the center content.
- Change the `h1` text from `Signal/Flow` to `SUPERLOOP.FM`.
- Reduce the padding of the `<header>` (currently `p-6`) to `py-3 px-6` to make it vertically smaller and give the hero section more vertical room. Keep the description paragraph.

### 2. Refine Hero Section (ROW 1)
- **Remove the Studio Image**: Delete the `<img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04..." />` and the absolute `<svg>` annotation lines overlapping it.
- **Upscale Synthetic Dreams**: Take the "Synthetic Dreams" `z-30` block (currently `lg:col-span-8` and `lg:col-span-4`) we injected previously. Since the image is gone, make this block *much bigger* to fill the space on the right side.
  - Remove its absolute/bottom-right anchoring if that restricts its size. Instead, use absolute positioning to stretch it across the right half of the hero area (`absolute right-0 top-1/2 -translate-y-1/2 w-[80%] lg:w-[60%] lg:pr-12`).
  - Significantly upscale the text rendering ("SYNTHETIC DREAMS").
  - Significantly upscale the 3D rotating card housing the vinyl record so it's massive and becomes the visual centerpiece of the hero. 

### 3. Replace "In This Issue" with "Supply Depot" (ROW 2, Block C)
- Locate Block C (currently the right-side list containing "Collecting Atari", etc. sitting in `col-span-1 lg:col-span-3`).
- Delete this block entirely.
- Open the prototype `/Users/draskomacpro/PROJECTS/SUPERLOOP/projects - website/aura.build tests/aura.build projects/SOUNDPACKS/folder 2.html`.
- Extract the `col-span-1 md:col-span-4 bg-zinc-100...` section (the "Supply_Depot" header, the four `.vending-btn` slots, and the orange "Join The Noise" bottom ad).
- Inject this extracted HTML into the `lg:col-span-3` slot previously occupied by Block C. 
- **Convert & Match**: Convert `class` to `className`, map custom colors to Tailwind (e.g. `bg-[#ff4500]` to `bg-orange-600`), swap `lucide` `<i data-lucide...>` for React imports (`Package`, `Disc`, `Mic2`, `Zap`, `Lock`). Remove the custom CSS pseudo-elements (like the ripple effect) but retain the sharp hover translates and border styling. Scale it down to fit perfectly within the `lg:col-span-3` layout column.

Output a summary of exact modifications. Ensure 0 TypeScript errors.
