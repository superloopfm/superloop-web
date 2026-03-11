# BRANDING & HERO TYPOGRAPHY FIX
**Role**: Expert Frontend Developer (Tailwind CSS/React)

## Context
The user wants to refine the hero section and header by removing the massive background text and replacing the standard text header with their official graphic logo. We have copied all their brand assets into the `public/logos/` directory.

## Assignment
Execute the following updates within `src/App.tsx`:

### 1. Update Header Logo
- Locate the `<header>` element and specifically the `<h1>` that says `SUPERLOOP.FM`.
- Replace the `<h1>` containing `SUPERLOOP.FM` with an image tag pointing to the new logo graphic: `<img src="/logos/superloop-text-bl-1.png" alt="Superloop.fm" className="h-6 md:h-10 object-contain" />`. You may adjust the height class slightly if needed, but it should sit cleanly next to the "The definitive guide..." description.

### 2. Remove Oversized Hero Typography
- Locate the huge `text-[15vw]` background typography layer in ROW 1 (it used to say "MODU/LAR_" and was recently changed to "SUPER/LOOP.FM").
- Delete this entire block (`div` and the massive `h2`s). The hero section should now solely feature the bright background and the large, floating `Synthetic Dreams` tracker module on the right.

### Extra Instruction
Ensure all React code remains perfectly typed, with no TS errors. Do not edit anything else (the "Supply Depot" component, grid layout, sidebars etc. should remain perfectly preserved). Output a brief summary.
