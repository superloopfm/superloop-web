# FIGMA LAYOUT INTEGRATION: REFINEMENT ITERATION 12
**Role**: Expert Frontend Developer (Tailwind Auto-Layout / React)

## Context
The user has provided a newly trimmed loop video for the Hero section. We need to stretch it wider, remove the hover animations from the massive 3D record image, add a click toggle that lights up the "SYNTHETIC DREAMS" title, and replace the data box below the title with clean promotional text.

## Assignment
Execute the following updates within `src/App.tsx` precisely:

### 1. Hero Background Video Width
- In ROW 1 (The Hero Section), locate the `<video>` element container (the `absolute left-0 top-0 w-[45%] h-full...`).
- Change its width from `w-[45%]` to `w-[65%]` (or even `w-[70%]`) so the video stretches out further to the right, becoming visibly layered underneath the "SYNTHETIC DREAMS" text.

### 2. Main Hero Record Interaction (Right Side of Text)
- Find the massive `TiltCard` or image container on the right side of Row 1 (likely containing `/images/record-sleeve-placeholder.jpg` or similar).
- **Remove existing animations/expansions**: Remove any classes like `group-hover:scale-110`, `group-hover:rotate-y-12`, `transition-transform`, etc. on that image so it doesn't move or scale up.
- **Add color hover effect**: Ensure it has a subtle color shift on rollover instead. E.g., add `grayscale hover:grayscale-0 transition-all duration-300` or similar so that rolling over it just changes its color. (Or if it's already colorful, perhaps `brightness-75 hover:brightness-110 `).
- **Add Click State**: 
  - Define a new state at the top: `const [isSyntheticLit, setIsSyntheticLit] = useState(false);`
  - Add `onClick={() => setIsSyntheticLit(!isSyntheticLit)}` to that image container. Make sure it has `cursor-pointer`.

### 3. Light Up 'SYNTHETIC DREAMS' Title
- Locate the massive `SYNTHETIC DREAMS` `<h1>` header text.
- Apply dynamic styling to it using the new state. 
- Example: `className={cn("text-[9vw] font-black leading-none tracking-tighter uppercase", isSyntheticLit ? "text-[#FF3300] drop-shadow-[0_0_25px_rgba(255,51,0,0.8)]" : "text-zinc-950")}`
- This should make the text violently glow orange when the record is clicked.

### 4. Replace Lower Left Box with Promo Text
- Directly under the "SYNTHETIC DREAMS" text block, we previously removed the data box, but there might be a placeholder or you might just need to add a new text block in that general area (bottom left of the text column).
- Add this cool, visible promotional typography:
  ```tsx
  <div className="mt-12 flex flex-col gap-1 font-mono text-sm tracking-widest uppercase">
    <div className="text-zinc-900 font-bold">Limited Edition of 100</div>
    <div className="text-zinc-500">Digital + Physical. Remix Week Pass Included.</div>
  </div>
  ```

Ensure 0 TypeScript errors. Output exact summary of changes.
