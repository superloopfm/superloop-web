# FIGMA LAYOUT INTEGRATION: REFINEMENT ITERATION 8
**Role**: Expert Frontend Developer (Tailwind Auto-Layout / React)

## Context
The user wants to increase the scale of the spinning Ronin Record element, change its playback interaction from hover-based to click-based, and remove some residual background/masking elements to let the visual breathe.

## Assignment
Execute the following updates within `src/App.tsx` precisely:

### 1. Simplify & Scale the CORE_01 Video (Block B)
- **Top Right Icon**: Find the `<Star>` icon in the top right corner of Block B and remove it entirely.
- **Remove Container Masks**: Currently, the `<video>` is inside a wrapper that likely restricts its shape or size (e.g., `rounded-full`, a `bg-[#0a0a0a]` border box, padding, etc.). 
- The user wants the **full visual visible** and **twice as big**. 
- So: Strip off any `rounded-full` or clip-path masks from the `<video>` itself. Scale up the video container massively. Make it occupy the full width and height of Block B if necessary, allowing the raw spinning MP4 frame (which has its own background) to dominate the block. Remove the inner `bg-[#0a0a0a]` box entirely. The video should just take up the majority of the `col-span-3` or `col-span-5` grid area. Look out for `group-hover` masks or wrappers that you previously built that might constrain the `aspect-square` record. Let the video be massive and unconstrained inside Block B.

### 2. Supply Depot Click Logic (Block C)
- **Logic Change**: The `videoRef.current?.play()` and `.pause()` triggers previously fired on `onMouseEnter` and `onMouseLeave` on the 4 Supply Depot buttons. 
- The user wants it to trigger on **click**, not hover.
- Update the interaction logic using a standard React state: `const [isPlaying, setIsPlaying] = useState(false);`. Use a `useEffect` to safely call `play()` or `pause()` on the `videoRef` when `isPlaying` toggles.
- Alternatively, handle the direct imperative call inside an `onClick` handler on the 3 unlocked buttons: `onClick={() => { const vid = videoRef.current; if(vid) { vid.paused ? vid.play() : vid.pause(); } }}`. (Or if the intention is that clicking "loads" the record and spins it continuously, just doing `vid.play()` is fine. A toggle is probably safest). *Implement an `onClick` toggle.* Remove all `onMouseEnter` and `onMouseLeave` tags that control the video.

### 3. Button Hover State Enhancements
- Since we removed the video trigger on hover, ensure the 3 active Supply Depot `<button>` elements have distinct, satisfying visual effects on hover themselves. (e.g., inverting colors, changing from white to `bg-[#00FF41]`, border flashes, or aggressive translate effects). They currently have `hover:translate-x-[3px]`, which is good, but make sure they feel highly responsive visually when rolled over.

Ensure 0 TypeScript errors. Output exact summary of changes.
