# FIGMA LAYOUT INTEGRATION: REFINEMENT ITERATION 15
**Role**: Expert Frontend Developer (Tailwind Auto-Layout / React)

## Context
The user wants to invert the color scheme of the `REVIEW: PRO-1` component (Block B: Product Showcase) to be dark with white dots. In the Hero section (top right part), we need to replace the single image container `record-sleeve-placeholder.jpg` with a composite container that stacks a newly provided "Dreamwarden Spine" PNG over a "Dreamwarden Record" JPG.

## Assignment
Execute the following updates within `src/App.tsx` precisely:

### 1. Invert 'REVIEW: PRO-1' Component Colors
- Locate `Block B: Product Showcase (Center-Right)` which currently has `<div className="col-span-1 lg:col-span-3 border-r border-zinc-300 p-6 relative overflow-hidden group">`.
- Change its background to dark: e.g. add `bg-zinc-950` to the container. Change `border-zinc-300` to `border-zinc-800`.
- Update the **Dotted Grid BG**: change the `radial-gradient(#d4d4d8 1px, transparent 1px)` to use a white/gray dot (`radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)`).
- Update the **Header tag** `REVIEW: PRO-1`:
  - Change `<div className="bg-white border border-zinc-200 ...">` to `<div className="bg-zinc-900 border border-zinc-700 px-3 py-1 shadow-sm text-white">`.
- Update the **Hands-On Verdict** text box at the bottom:
  - Change `<div className="bg-white/90 backdrop-blur border border-zinc-200 p-4">` to `<div className="bg-zinc-900/90 text-zinc-300 backdrop-blur border border-zinc-700 p-4">`.
  - Ensure the text headers in it read well by changing `mb-1` title string to `text-white` or `text-zinc-100` and paragraph to `text-zinc-400`.

### 2. Top Right Composite Record Container
- Locate the right side of the Hero row `Right: 3D tilt card — massive`.
- You will find a container wrapping `<img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17..."/>`.
- Maintain the outer interaction `div` (`onClick={() => setIsSyntheticLit(!isSyntheticLit)}`). 
- Delete the existing `<img>` and the spinning `<Disc className="... animate-spin"/>` next to it as well as the progress bar / `PlayCircle` if they clutter the image. We just want the raw visual graphic.
- Build a new inner container spanning the full height/width (like `aspect-square w-full relative`) that layers two images:
  - **Bottom Image**: `<img src="/images/dreamwarden-record.jpg" className="absolute inset-0 w-full h-full object-contain z-10 brightness-75 hover:brightness-110 transition-all duration-300" alt="Record" />`
  - **Top Image**: `<img src="/images/dreamwarden-spine.png" className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none" alt="Spine Overlay" />`

Ensure 0 TypeScript errors. Output exact summary of changes.
