# FIGMA LAYOUT INTEGRATION: REFINEMENT ITERATION 3
**Role**: Expert Frontend Developer (Tailwind Auto-Layout / React)

## Context
The user has provided final feedback on the third iteration of the Figma layout. We need to implement state-driven interactivity in the Remix Week section, replace a logo, and refine the styling of the Remix Now section.

## Assignment
Execute the following updates within `src/App.tsx` and `src/index.css` precisely:

### 1. Replace Left Sidebar Logo
- In the `LEFT MARGIN: Running Header` (`<aside>`), locate `<Aperture className="w-6 h-6 text-zinc-900" />`.
- Replace it with the Superloop headphone logo image:
  `<img src="/logos/superloop-bl-1.png" alt="Superloop" className="w-8 h-8 object-contain" />`

### 2. Implement the `--mix` Visual Corruption Slider
- Import `useState` from React.
- At the top of the `App` component, declare state: `const [mix, setMix] = useState(0);`
- In the `main` or root `body` wrapper, apply `style={{ '--mix': mix / 100 } as React.CSSProperties}` so all CSS variables inherit the value.
- Update the slider input: `<input type="range" min="0" max="100" value={mix} onChange={(e) => setMix(Number(e.target.value))} .../>`
- **Glitch Text Effect**: Update `index.css` to transition `.slice-top`, `.slice-mid`, and `.slice-bot` based on `--mix` (e.g., `transform: translateX(calc(20px * var(--mix)))`).
- **Image Corruption Effect**: Add a CSS class or inline style to the Remix Laboratory image that applies a filter based on the slider value. E.g., `filter: hue-rotate(calc(180deg * var(--mix))) contrast(calc(100% + 50% * var(--mix))) grayscale(calc(100% - 100% * var(--mix)))`.

### 3. Decrease Remix Now Section Height & Fix Button Styles
- Locate the `REMIX NOW: Full-width dark editorial block` at the bottom.
- Reduce vertical padding (e.g., `py-16` -> `py-8` or `py-12`) to make it less tall.
- **Vending Machine Buttons**: The user wants them to look exactly like the `html` style. 
  - Update the 4 available pack buttons. Currently they are `<button className="vending-btn w-full bg-neutral-900 border border-neutral-800 p-4... hover:-translate-y-1">`.
  - Revert them to the skeuomorphic or chunky style used in `sp-soundpack.html`: Remove `hover:translate-y-1` and instead implement the "clunk" effect. Better yet, just use a thick border and square layout for the button to mimic the brutalist design: `bg-neutral-900 border-2 border-neutral-800 p-4 rounded-none hover:bg-[#111] hover:border-[#FF3300] transition-all`. If there is a specific hover effect from the HTML (e.g. `hover:translate-x-[3px] hover:translate-y-[3px] shadow-[3px_3px_0px_white]`), apply it.

Ensure 0 TypeScript errors. Output exact summary of changes.
