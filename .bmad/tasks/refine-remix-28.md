# STRATEGIC EXECUTION: MICRO-ANIMATIONS REFINEMENT
**Role**: Expert Frontend Developer & UI/UX Motion Architect

## Context
We just implemented Phase 27 with Anime.js. User loved the responsiveness but has very specific UI feedback on how the "Soundpack Content" buttons (A-01, A-02, B-01) should feel, along with a logo adjustment.

## Instructions
Please carefully parse and rewrite `src/App.tsx` to implement the following upgrades:

### 1. Soundpack Hover Physics (No Scaling!)
The user **DOES NOT** want the buttons to scale up or expand physically on hover.
*   **Remove the `scale: 1.02` Anime.js effect** from the soundpack rows. Give them a static size.
*   **New Hover State (`onMouseEnter`):** Instead of scaling, use Anime.js (or Tailwind) to color the key text (e.g. turning the title or "DOWNLOAD" text to `fuchsia-600` or `#FF3300`) and animate the sharp drop-back shadow (the `shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]` layer). Maybe push the shadow further out to `5px_5px` or change its color on hover.
*   **Active Click State (`onMouseDown`):** They want a physical, mechanical "indent" feeling on click. On press, the button should translate down `+3px` and the shadow should shrink to `0px_0px` so it feels like a real tactile button being pushed into the page. (You can do this purely with Tailwind `active:translate-y-[3px] active:shadow-none` or via Anime.js).

### 2. Live Audio Waveform Visualizer
When the record starts spinning (`isPlaying` is true), the user wants a small looping waveform or equalizer animation to appear inside the button tab.
*   **Currently**, `isPlaying` is a single boolean. The user clicks a button, and it toggles.
*   **Update State:** Change `isPlaying` from a boolean to a string/number tracking the active tab (e.g., `setPlayingTab(0)` or `setPlayingId('A-01')`).
*   **The Waveform:** If the tab is the active playing tab, show a tiny 3-bar or 4-bar CSS animation (or SVG) that bounces like an audio level meter. It can sit right next to the spinning `<Disc />` icon or the header text inside the button. Make it look sleek and minimal (10px high).

### 3. Header Logo Padding & Sizing
*   Target the main `superloop.fm` top-left logo inside the `<header>`.
*   Reduce its rendered size by roughly **20%**. 
*   Increase the padding around it (perhaps adding more `py-` padding to the `<header>` itself to give the logo more breathing room from the top and bottom borders).

## CRITICAL RULES
1. Maintain exactly all other styling logic.
2. Produce beautifully typed, error-free React code for `App.tsx`.

## Output
Produce the fully optimized `src/App.tsx` file. State exactly what you adjusted.
