# FIGMA LAYOUT INTEGRATION: REFINEMENT ITERATION 7
**Role**: Expert Frontend Developer (Tailwind Auto-Layout / React)

## Context
The user has provided two real 3D assets to replace placeholders: a spinning record graphic (`ronin-record.mp4`) and a vending machine render (`sunset-vending.png`). We need to inject these into the layout and connect the record to interactions in the Supply Depot.

## Assignment
Execute the following updates within `src/App.tsx` precisely:

### 1. Sunset Vending Machine Injection
- Locate the `REMIX NOW: Full-width dark editorial block` at the bottom of the page.
- In the left column (`lg:col-span-5` or similar), there is a container for the glitch visual overlay currently using a stock Unsplash image (`photo-1571266028243...`).
- Replace that `<img>` tag with the new Vending Machine asset:
  `<img src="/images/sunset-vending.png" alt="Sunset Vending Machine" className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-80" />`
  (Feel free to tweak the filters or object-fit if `object-cover` cuts it off too awkwardly; `object-contain max-h-[32rem] object-bottom` might look better if the image has a transparent background or needs to sit firmly at the bottom of the container. The user said "it should not be too huge".)

### 2. CORE_01 Spinning Record Injection
- Locate **Block B: Product Showcase (Center-Right)**.
- Currently, the center has an Abstract Hardware Box with a `<Cpu>` icon and "CORE_01" text.
- Replace the `<Cpu>` icon and its surrounding box with a clean container for the video.
- The video logic:
  - Add `const videoRef = useRef<HTMLVideoElement>(null);` at the top of the component.
  - Insert the video:
    ```tsx
    <video 
      ref={videoRef}
      src="/videos/ronin-record.mp4" 
      muted 
      loop 
      playsInline
      className="w-full h-full object-cover rounded-full"
    />
    ```
- Style its container to look like a premium record display. E.g., a sleek dark square wrapper, perhaps keeping the "CORE_01" floating annotations.

### 3. Supply Depot Interaction Wiring
- The user wants the `CORE_01` record to spin/animate *only* when clicking or interacting with any of the tabs in **Block C: Supply Depot**.
- By default, the video should be paused on frame 0.
- Update the 4 Vending Slots buttons (A-01, A-02, B-01, C-09) with `onMouseEnter` and `onMouseLeave` handlers.
- When `onMouseEnter` triggers, call `videoRef.current?.play()`.
- When `onMouseLeave` triggers, call `videoRef.current?.pause()`.
- *(Alternatively, if it's easier to scale or opacity the video instead, do that, but standard video play/pause on hover is perfect).*

Ensure you import `useRef` from `react`. Ensure 0 TypeScript errors. Keep all other layout elements completely identical to Iteration 6. Output exact summary of changes.
