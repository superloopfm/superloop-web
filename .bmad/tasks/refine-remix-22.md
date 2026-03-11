# STRATEGIC UI RESTRUCTURE: ITERATION 22
**Role**: Expert Frontend Developer (Tailwind Animations & Micro-Interactions)

## Context
The user wants to remove the physical "button press" simulation (translation/shadow shifts) from the `Soundpack Content` tabs. Instead, hovering over them should trigger an animated color spectrum (like a fuchsia/orange gradient) and perhaps some quick text/glow animation.

Secondly, the user wants a highly visible, animated arrow pointing DOWN from the `Remix Week` section towards the bottom `Vending Machine`. Next to the arrow, we should have strong FOMO text (e.g., `"CLAIM YOUR FREE PACK & REMIX PASS"`). Finally, the orange borders that separate the bottom section need to be cooled down to white/grayish-white.

## Assignment
Execute the following targeted UI updates within `src/App.tsx`:

### 1. Soundpack Hover Animations
- Locate `Block C: Supply Depot (Right)` where the soundpack buttons are (e.g., `<button className="group w-full text-left bg-zinc-50 border-2 border-transparent p-3 shadow-sm hover:border-black active:translate-y-px transition-all">`).
- **Remove** physical press classes like `active:translate-y-px`, `hover:border-black`, `shadow-sm`, etc.
- **Implement Spectrum Hover**: When hovered, the background should transition into an animated gradient (using our theme colors), and the text elements inside should turn `text-white`. 
- *Tailwind specific example:* Change the button container to use:
  `className="group relative w-full text-left bg-zinc-50 border-2 border-transparent p-3 hover:bg-gradient-to-r hover:from-fuchsia-600 hover:to-orange-500 overflow-hidden transition-all duration-300 z-10"`
  - *Inside the button*, ensure text elements like `text-zinc-500` become `group-hover:text-fuchsia-100`, `text-black` becomes `group-hover:text-white`, etc., so they are legible over the gradient.

### 2. FOMO Arrow (Remix Week → Vending Machine)
- Locate the absolute bottom of `Block A: Remix Week` (before `ROW 2` ends).
- Inject an aggressive, animated downward arrow pushing the user to scroll to the vending machine. This can sit either inside Block A or directly between Row 2 and the Vending Machine block.
- **Content:** An overlapping `<ArrowDownRight />` or `<ArrowDown />` icon paired with text like `"CLAIM YOUR FREE PACK & REMIX PASS"`.
- **Animation:** Use standard tailwind `animate-bounce` on the container or arrow. Make sure the aesthetic matches our new neon/fuchsia vibe.
  
### 3. Change Orange Borders to White/Gray
- Between Row 2 and the Bottom Vending section, there is a `border-t-2 border-[#FF3300]`. Change `border-[#FF3300]` to `border-zinc-300` or `border-white/50`.
- Also find the `border-l-2 border-[#FF3300]` next to the "Remix Now" `<h2>` and change it to `border-white/50`.

Execute these refinements. Ensure 0 TypeScript errors. Output standard confirmation.
