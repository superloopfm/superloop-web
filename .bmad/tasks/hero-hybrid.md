# HYBRID HERO SECTION DIRECTIVE
**Role**: Expert Frontend Developer (Tailwind CSS/React)

## Context
The user loves the current pristine, wide `voltage-mag-1` layout, but wants to "hybridize" the main hero section (ROW 1) by injecting a specific UI element from `algo 2.html` directly over the main hero image (which contains the studio/modular synth) and altering the oversized hero typography.

## Assignment
Modify `src/App.tsx` to accomplish the two following objectives precisely:

### 1. Update Oversized Typography
- Locate the `<!-- OVERSIZED TYPOGRAPHY LAYER -->` within ROW 1.
- Change the massive background text from `MODU` / `LAR_` to `SUPER` / `LOOP.FM`.
- Ensure it retains the exact same styling (`text-[15vw]`, `mix-blend-hard-light`, etc.) so it sits identically in the composition. Adjust the visual offset (`pl-[10vw]`) if necessary so it looks balanced as `SUPERLOOP.FM`.

### 2. Inject "Synthetic Dreams" Track Block
- Open `/Users/draskomacpro/PROJECTS/SUPERLOOP/projects - website/aura.build tests/aura.build projects/HOME PAGE/algo 2.html` (note: it's outside the web repository, use the absolute path or refer to your knowledge if you've read it).
- Extract the entire `<!-- #1 TRACK: THE PEAK -->` block (the section that has "01", the "CURRENT REIGN" orange tag, "SYNTHETIC DREAMS", the neon green/orange stats, and the 3D tilting card showing the vinyl record cover).
- Translate this block into clean React/Tailwind. (Swap `class` for `className`, replace `iconify-icon` tags with named `lucide-react` imports like `User`, `BarChart2`, `TrendingUp`, `Disc`, `PlayCircle`).
- **Injection Point**: Place this block *inside* ROW 1 of `src/App.tsx`, overlaying the hero image.
- **Styling the Injection**: Since the host layout is bright (`bg-zinc-50`), but the injected block is essentially dark-mode UI (`text-white`, `mix-blend-difference`), use `absolute z-30` or grid placement to position it elegantly within the hero banner. Let it dominate the foreground over the studio image, perhaps anchored to the bottom right or center. Retain its specific aesthetic (`bg-[#0a0a0a]`, `shadow-[0_0_50px_rgba(0,255,65,0.1)]`, etc.) to create a stark, cool contrast against the bright Swiss grid background.

Output a summary of exact modifications made. Do not alter any other section (Block A, B, C, sidebars) and ensure TypeScript compiles with 0 errors.
