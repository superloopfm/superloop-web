# FIGMA LAYOUT INTEGRATION: REFINEMENT ITERATION 9
**Role**: Expert Frontend Developer (Tailwind Auto-Layout / React)

## Context
The user wants to add an animated, filtered background video to the left side of the top Hero section ("SYNTHETIC DREAMS" row) and remove some clutter.

## Assignment
Execute the following updates within `src/App.tsx` precisely:

### 1. Remove the Frequency Response Box
- In ROW 1 (The Hero Section), locate the `Vellum Overlay Box 1 (Floating Data)` container in the bottom left. 
- It contains `Frequency Response`, an `<Activity>` icon, and data like `Low Pass 20Hz - 20kHz`.
- **Remove this entire div block completely.**

### 2. Inject Left-Side Background Video
- Still in ROW 1, the user wants a video playing playfully in the background of the left half of this header.
- The video should span from the absolute left edge of the grid container, stopping approximately just past the `Current Reign` button area (so covering about `40%` to `50%` of the width of the row).
- **Video Element**:
  ```tsx
  <div className="absolute left-0 top-0 w-[45%] h-full overflow-hidden pointer-events-none z-0">
    <video 
      src="/videos/ronin-record.mp4" 
      muted 
      loop 
      autoPlay 
      playsInline
      className="w-full h-full object-cover opacity-30 grayscale"
    />
    {/* Grid / Dot Filter Overlay */}
    <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
    {/* Right edge fade-out gradient so it blends into the white background smoothly */}
    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-50 to-transparent"></div>
  </div>
  ```
- Adjust the exact widths, opacities, and z-indexes so it sits *behind* the `Current Reign` and `SYNTHETIC DREAMS` text block, but provides that cool "filtered video background" aesthetic. You must use the existing `/videos/ronin-record.mp4` asset.
- Ensure the fade out (`from-zinc-50 to-transparent`) uses the correct base background color (`bg-zinc-50`) so it seamlessly blends into the empty white space on the right before hitting the massive 3D tilt card.

Ensure 0 TypeScript errors. Output exact summary of changes.
