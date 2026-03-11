# STRATEGIC UI RESTRUCTURE: ITERATION 17
**Role**: Expert Frontend Developer (Tailwind Layout & UX Structure)

## Context
Based on our strategic marketing review, we are reorganizing the main layout of `App.tsx` from top to bottom. The current funnel is visually chaotic; the new funnel must follow this strict narrative arc:
**Desire (Hero) → Curiosity/Value (Sample Station) → Action/Payoff (Vending Machine at bottom).**

## Assignment
Execute the following updates within `src/App.tsx` precisely:

### 1. Update Hero Copy (Maximum FOMO)
- Locate the Limited Edition text underneath the `SYNTHETIC DREAMS` title.
- Change `"Limited Edition of 100"` to `"Only 100 Pressed."`
- Change `"Digital + Physical. Remix Week Pass Included."` to `"Only 1 can be yours. Remix Week Pass Included."`

### 2. Move Soundpack List UP & Merge with Remix Slider (The Sample Station)
- Find **Block C: Supply Depot** (which is now called `Soundpack_Content`).
- Locate **Block A: Remix Week** (the one bleeding into the left margin with the fader/pads).
- Currently, **Block A** is separated from **Block C** by the `REVIEW: PRO-1` component (Block B).
- **Rearrange Row 2** (`ROW 2: Asymmetrical Content Blocks`) so that the Soundpack list sits directly next to or integrated closely with the Remix Week controls. 
- *Layout suggestion*: Keep Block A (Remix controls) as `lg:col-span-5`. Remove the Soundpack Content block from the bottom *Remix Now* section area (if it's down there) and place it directly into ROW 2 as `lg:col-span-4`. Keep the `REVIEW: PRO-1` block as `lg:col-span-3` but move it to the *right* side of the row.
- **Goal for Row 2:** Left: Remix Controls (`lg:col-span-5`). Center: Soundpack Content (`lg:col-span-4`). Right: REVIEW PRO-1 (`lg:col-span-3`). Adjust borders/padding as necessary so they fit the 12-column grid.

### 3. Vending Machine is the Ultimate Closer
- Find the **REMIX NOW: Full-width dark editorial block** at the bottom of the page.
- Because we moved the Soundpack Content up to Row 2, this bottom section now solely contains the giant Vending Machine (left) and the **"Break The Loop" action box** (right). 
- Ensure this entire Remix Now block sits completely alone at the bottom of the page (right before the Footer).
- Expand the right side column (`lg:col-span-7`) so it features the "Break the Loop" email capture form prominently next to the Vending Machine.
- Add a mocked **Live Inventory Counter** right below the title `REMIX NOW` or above the email box in the right column:
  ```tsx
  <div className="flex items-center gap-3 mb-8 bg-zinc-900 border border-zinc-800 p-3 w-fit">
    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
    <span className="font-mono text-sm font-bold text-white tracking-widest">47 OF 100 RECORDS REMAINING</span>
  </div>
  ```

Execute these structural layout shifts. Ensure 0 TypeScript errors. Output an exact summary of the rearranged DOM hierarchy.
