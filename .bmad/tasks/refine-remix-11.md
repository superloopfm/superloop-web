# FIGMA LAYOUT INTEGRATION: REFINEMENT ITERATION 11
**Role**: Expert Frontend Developer (Tailwind Auto-Layout / React)

## Context
The user has provided a new video (`hero-bg.mp4`) for the Hero section background that needs to be in full color. They also requested renaming "Supply Depot" to "Soundpack Content" with a minidisk icon, and want the bottom white footer removed and replaced with a clean black footer.

## Assignment
Execute the following updates within `src/App.tsx` precisely:

### 1. Hero Background Video Update
- In ROW 1 (The Hero Section), locate the `<video>` element we just injected (which currently points to `/videos/ronin-record.mp4` and has `grayscale`).
- Change the `src` to `/videos/hero-bg.mp4`.
- **Remove** the `grayscale` class from the video, allowing the full color to shine through. Keep the `opacity-30` or adjust to `opacity-40` if it looks too faint, but make sure the `grayscale` filter is gone.

### 2. Rename 'Supply Depot' & Icon Change
- Locate **Block C (Right Column)** where it says `SUPPLY DEPOT`.
- Change the text `"SUPPLY DEPOT"` to `"SOUNDPACK CONTENT"`.
- It currently likely has a `<Database>` or `<Box>` icon next to it. Replace that icon with the `<Disc3>` icon from `lucide-react` to simulate a "Sony minidisk style" circular disk. (Make sure to import `Disc3` from `lucide-react` if it's not already imported).

### 3. Replace Bottom Footer
- Scroll to the very bottom of the `<main>` container where we have the `REMIX NOW: Full-width dark editorial block`.
- Currently, below that dark section, there is likely a white space or footer (e.g., `bg-zinc-50` expanding downwards).
- Ensure the `REMIX NOW` black block is the final massive content block.
- Immediately below it, add a simple, small black footer:
  ```tsx
  <footer className="col-span-1 md:col-span-3 bg-zinc-950 text-zinc-500 py-6 text-center text-xs font-mono uppercase tracking-widest border-t border-zinc-900">
    © {new Date().getFullYear()} Superloop.fm — All Rights Reserved.
  </footer>
  ```
  *(Note that if your grid layout extends past the main row logic, make sure the footer spans the full width of the viewport, e.g. using `col-span-full` or just placing it outside the main content grid if needed. Just make it a small dark terminal-style footer at the very bottom).*

Ensure 0 TypeScript errors. Output exact summary of changes.
