# FIGMA LAYOUT INTEGRATION: REFINEMENT ITERATION 6
**Role**: Expert Frontend Developer (Tailwind Auto-Layout / React)

## Context
The user wants to enhance the interactive elements in the "Remix Week" block (Block A) by adding skeuomorphic audio hardware components (a fader, pads, and a knob). They also want some viewport adjustments to ensure the content feels tighter on 16-inch laptop displays, and some cleanup on the left navigation menu.

## Assignment
Execute the following updates within `src/App.tsx` and `src/index.css` precisely:

### 1. Remix Week Hardware UI (Block A)
- **The Fader**: Currently, there is a simple `<input type="range">`. Make it shorter horizontally. Style it to look more like a vertical or horizontal DJ mixer fader. A horizontal short fader is fine: e.g., an intricate track with a chunky rectangular thumb.
- **MPC Pads**: Add two square buttons (MPC style pads) next to or below the fader. They should look like rubber pads (e.g., `w-12 h-12 rounded bg-zinc-800 border-b-4 border-zinc-900 active:border-b-0 active:translate-y-1 shadow-inner`).
- **The Knob**: Add a circular knob. You can simulate a knob with a rounded div and a little indicator line, or just a stylized circle.
- **Visual Effects Wiring**: We want all these to affect the `mix` state or individual states that tie into CSS variables.
  - For example, add state variables: `const [pad1, setPad1] = useState(false);`, `const [pad2, setPad2] = useState(false);`.
  - Pass these into the `style={{...}}` of the main container: `'--pad1': pad1 ? 1 : 0`, etc.
  - Update `index.css` so that pressing the pads aggressively inverts colors (`filter: invert(calc(100% * var(--pad1)))`) or violently shifts the glitch typography (`transform: scale(calc(1 + 0.2 * var(--pad2)))`). Just ensure hitting the pads visibly alters the image/structure of the Remix block in real-time. Make sure `onMouseDown` and `onMouseUp`/`onMouseLeave` handle the pad press state accurately.

### 2. Left Sidebar Adjustments
- **Thin the Sidebar**: In `<main>`, the desktop layout is `md:grid-cols-[16rem_1fr_4rem]`. Reduce `16rem` to something like `12rem` or `14rem`.
- *CRITICAL*: Update Block A's negative margins (`-ml-[16rem] pl-[16rem]`) to match whatever new width you choose (e.g., `-ml-[12rem] pl-[12rem]`).
- **Remove Locks**: In the sidebar `<nav>`, remove the `opacity-50 cursor-not-allowed` from the "Leaderboard" and "Remix Trees" items. Remove the `[BETA]` text and the `<Lock />` icons. Make them look indistinguishable from the other active links.

### 3. Viewport Optimization (Hero Section)
- The user is viewing on a 16-inch MacBook and the bottom row (Block A/B/C) is getting cut off.
- Locate ROW 1 (The Hero Section with "SYNTHETIC DREAMS").
- Currently, it has `min-h-[60vh]`. Reduce this to `min-h-[45vh]` or `min-h-[50vh]` so the content below it pulls up higher into the visible viewport. Ensure the inner elements of the hero (the text, the 3D rotating disc card) still fit without clipping. You may need to scale down the `text-[7vw]` or the 3D card slightly if it feels too cramped.

Ensure 0 TypeScript errors. Keep all other layout elements completely identical to Iteration 5. Output exact summary of changes.
