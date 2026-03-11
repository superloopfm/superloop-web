# FIGMA LAYOUT INTEGRATION: REFINEMENT ITERATION 4
**Role**: Expert Frontend Developer (Tailwind Auto-Layout / React)

## Context
The user has requested to expand the left sidebar margin to accommodate a full navigation menu. Based on the Superloop Master Whitepaper concepts, we need to add the primary navigation links for the Public Beta Launch, with some advanced features visibly locked.

## Assignment
Execute the following updates within `src/App.tsx` precisely:

### 1. Expand the Left Grid Context
- Locate the main `main` grid wrapper: `className="relative z-10 w-full min-h-screen grid grid-cols-[3rem_1fr_3rem] md:grid-cols-[4rem_1fr_4rem] ..."`
- Expand the left column on desktop: Change the `md` grid configuration to `md:grid-cols-[16rem_1fr_4rem]` (or similar width that feels balanced, `14rem` or `16rem`).
- *Important*: In ROW 2 Block A (the Remix Week block), we previously set `-ml-[3rem] md:-ml-[4rem] pl-[3rem] md:pl-[4rem]` to bleed into that 4rem margin. You must update this negative margin to match the new left column width so it still bleeds perfectly to the edge (e.g., `-ml-[3rem] md:-ml-[16rem] pl-[3rem] md:pl-[16rem]`).

### 2. Build the Left Sidebar Navigation
- Locate the `LEFT MARGIN: Running Header` (`<aside>`). Currently, it centers items vertically and horizontally.
- Change its layout so that the content aligns to the left padding (e.g., `items-start`, `px-6 py-8`).
- Keep the Superloop headphone logo at the top left.
- Underneath the logo, insert a brutalist navigation menu. Use a vertical list of links.
- Apply a hover effect (e.g., text color changes to `#FF3300`, or an arrow `->` appears on hover).

#### Menu Items to Include:
1. **Studio / Remix** (Active)
2. **Soundpacks** (Active)
3. **Artist ID** (Active - maps to the "user page")
4. **Leaderboard** (Disabled / Locked) - Add a small `[LOCKED]` or `[BETA]` badge or use a lock icon, give it reduced opacity (`opacity-50`).
5. **Remix Trees** (Disabled / Locked) - Add a lock badge, reduced opacity.

### 3. Styling the Menu
Use uppercase monospace fonts (`font-mono text-sm uppercase font-bold tracking-widest`) to match the terminal/Swiss grid aesthetic of the site. Space out the items nicely (`gap-4` or `gap-6` in a flex column).

Ensure 0 TypeScript errors. Output exact summary of changes.
