# Superloop.fm Landing Page — Technical Architecture

**Version:** 1.0
**Date:** 2026-03-31
**Status:** Approved for Implementation
**Target Launch:** April 11, 2026

---

## 1. Architecture Overview

### Current State Assessment

The existing codebase is a **monolithic single-file React app** (`App.tsx` — 554 lines) with:
- All sections inlined in one component
- Light theme (zinc-50 bg) — needs full dark mode conversion
- Sidebar nav showing features that don't exist yet (Leaderboard, Remix Trees, Studio/Remix)
- Interactive DJ controls (fader, pads, knob) that are not in the new spec
- "Remix Now / Break The Loop" competition block — replaced by Founders value stack
- Supabase client initialized but not connected to any UI
- No routing (react-router-dom installed but unused)
- Several audio/3D libraries installed but unused (three.js, tone.js, wavesurfer.js, xsound, audiomotion-analyzer)

### Target Architecture

**Component-based landing page** with clear section boundaries, shared state for email capture, and Supabase integration for the scarcity counter.

```
src/
├── main.tsx                    # Entry point
├── App.tsx                     # Layout shell (sidebar + sections + footer)
├── index.css                   # Global styles, fonts, textures, animations
├── lib/
│   ├── supabase.ts             # Supabase client (exists)
│   ├── fonts.ts                # Font preload config
│   └── constants.ts            # Brand colors, copy, stem data
├── hooks/
│   ├── useEmailCapture.ts      # Supabase email submission + state
│   ├── useScarcityCounter.ts   # Real-time remaining count from Supabase
│   └── useAudioPreview.ts      # Single-track audio playback controller
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx         # Fixed left nav, smooth-scroll links
│   │   └── Footer.tsx          # Nav + legal + socials + tagline
│   ├── sections/
│   │   ├── Hero.tsx            # Video bg, headline, CTA, founders badge
│   │   ├── FoundersEdition.tsx # Three-column conversion zone
│   │   ├── WhatsInside.tsx     # Stem list + audio previews
│   │   ├── HowItWorks.tsx      # 4-step horizontal strip
│   │   ├── SoundpackUniverse.tsx # Locked machine silhouettes
│   │   ├── RemixWeek.tsx       # Competition teaser
│   │   ├── ArtistId.tsx        # Identity system teaser + CSS card
│   │   └── Community.tsx       # Social links + second email capture
│   └── ui/
│       ├── EmailCaptureBar.tsx  # Reusable email input + counter + states
│       ├── StemRow.tsx          # Single stem entry (tag, name, preview, status)
│       ├── ValueStackPanel.tsx  # "What Founders Get" pricing panel
│       ├── SoundpackContentPanel.tsx # Terminal-style stem list
│       ├── ArtistIdCard.tsx     # CSS-built radar chart card
│       ├── MachineSlot.tsx      # Vending machine slot (active/locked)
│       └── ScarcityCounter.tsx  # "73 OF 100 REMAINING" display
└── assets/
    └── (imported SVGs/images if needed)
```

---

## 2. Technology Decisions

### Keep (Already Installed)

| Package | Purpose | Notes |
|---|---|---|
| `react` + `react-dom` 19 | UI framework | Already installed |
| `vite` 7 + `@vitejs/plugin-react` | Build tool | Already configured |
| `tailwindcss` 4 + `@tailwindcss/vite` | Styling | Already configured (v4 CSS-first config) |
| `@supabase/supabase-js` | Email capture + counter | Client exists, needs UI wiring |
| `lucide-react` | Monoline icons | Matches spec requirement |
| `framer-motion` | Subtle animations | Glitch transitions, section reveals |
| `clsx` + `tailwind-merge` | Class utilities | Already installed |

### Remove (Unused / Not Needed)

| Package | Reason |
|---|---|
| `three` + `@types/three` | No 3D rendering in landing page |
| `tone` | No real-time audio synthesis needed |
| `wavesurfer.js` | Overkill for simple preview playback — use HTML5 Audio API |
| `xsound` | Unused, redundant |
| `audiomotion-analyzer` | No spectrum visualization in spec |
| `animejs` | Framer Motion covers all animation needs |
| `react-router-dom` | Single-page landing — no routing needed |
| `@iconify/react` | Lucide covers all icon needs |

### Add

| Package | Purpose |
|---|---|
| `@fontsource/bebas-neue` | Display font (or load via Google Fonts link) |
| `@fontsource/jetbrains-mono` | Mono font for terminal aesthetic |

**Font loading strategy:** Preload display font in `index.html` `<head>` via Google Fonts link. Tailwind v4 `@theme` font-family tokens for `--font-display`, `--font-mono`, `--font-body`.

---

## 3. Brand System Implementation

### Tailwind v4 Theme Tokens (`index.css`)

```css
@theme {
  /* Colors */
  --color-brand-orange: #FF6B35;
  --color-brand-black: #0A0A0A;
  --color-brand-dark: #111111;
  --color-brand-muted: #666666;

  /* Fonts */
  --font-display: 'Bebas Neue', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --font-body: 'Satoshi', 'General Sans', sans-serif;
}
```

### Texture System (CSS Utilities)

Existing utilities to keep and refine:
- `.bg-noise` — fractal noise SVG overlay
- `.crt-grain` — fixed grain overlay
- `.phosphor-grid` / `.bg-grid-dark` — dot/line grid patterns

New utilities to add:
- `.scanlines` — horizontal CRT scanline effect
- `.halftone` — halftone dot pattern for section backgrounds
- `.dot-grid` — subtle dot grid (matches Figma mockup backgrounds)

### Dark Mode Conversion

The current app uses **light theme** (`bg-zinc-50`, `text-zinc-950`). The spec requires **always dark mode** (`bg-[#0A0A0A]`). This is a full inversion — not a toggle.

---

## 4. Component Architecture Details

### App.tsx — Layout Shell

```tsx
// Simplified structure
<div className="bg-brand-black text-white font-body min-h-screen">
  <div className="crt-grain" /> {/* Global texture overlay */}
  <Sidebar />
  <main>
    <Hero />
    <FoundersEdition />
    <WhatsInside />
    <HowItWorks />
    <SoundpackUniverse />
    <RemixWeek />
    <ArtistId />
    <Community />
  </main>
  <Footer />
</div>
```

No routing. No context providers needed beyond what's built into hooks.

### Sidebar (Fixed Navigation)

- **Position:** `fixed left-0 top-0 h-screen w-48`
- **Items:** SOUNDPACKS, REMIX WEEK, ARTIST ID, FOUNDERS (only these four)
- **Behavior:** Each item calls `document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' })`
- **Mobile:** Hidden, replaced by hamburger overlay
- **Active state:** Track scroll position with `IntersectionObserver` to highlight current section

### Hero Section

- **Video:** `<video>` tag with `autoPlay muted loop playsInline`, dark overlay `bg-black/60`
- **Dot grid overlay:** CSS `radial-gradient` pattern on a `::after` pseudo-element
- **Right visual:** Founders bag image, `absolute` positioned, `animate-float` on idle
- **CTA:** Smooth-scrolls to `#founders` section

### FoundersEdition — Three-Column Layout

This is the most complex section. Three responsive columns:

```
Desktop (lg+):  [Vending Machine 35%] [Bag + Card Stack 25%] [Value Stack + Stems 40%]
Tablet (md):    [Bag + Card Stack 50%] [Value Stack + Stems 50%]  (machine hidden)
Mobile:         [Bag] → [Value Stack] → [Stems] → [Email Capture]  (vertical stack)
```

**Vending Machine (Left):**
- Placeholder image container
- CSS grid of circular slots overlaid on the machine image
- Founders slot has `ring-2 ring-brand-orange animate-pulse` border
- Other slots dimmed with `opacity-30 grayscale`

**Bag + Card Stack (Center):**
- Main bag image with CSS `shimmer` animation (gradient sweep)
- 1-2 card edges offset behind using `absolute` positioning with slight rotation

**Value Stack (Right Top):**
- Monospace layout with dot leaders using CSS `border-bottom: dotted`
- Dollar values in brand orange
- "TOTAL VALUE: $417+" and "YOUR PRICE: FREE" as the largest text, display font

**Soundpack Content Panel (Right Bottom):**
- Reuses `StemRow` component
- Terminal header bar with `SOUNDPACK_CONTENT` and version badge
- Each row is a bordered card with tag, name, icon, download/locked status

**Email Capture Bar (Below All Columns):**
- Full-width, `border-t-2 border-brand-orange`
- `ScarcityCounter` centered above input
- `EmailCaptureBar` component (reused in Section 8)

### EmailCaptureBar — Shared Component

```tsx
interface EmailCaptureBarProps {
  className?: string;
}
```

Internally uses:
- `useEmailCapture()` hook — manages email input, submission state, error/success/duplicate
- `useScarcityCounter()` hook — reads remaining count

States: `idle` → `submitting` → `success` | `duplicate` | `error`

### Audio Preview System

**No external audio library needed.** Use the native `HTMLAudioElement` API:

```tsx
// useAudioPreview.ts
const useAudioPreview = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  const play = (src: string) => {
    if (audioRef.current) audioRef.current.pause();
    audioRef.current = new Audio(src);
    audioRef.current.play();
    setCurrentTrack(src);
  };

  const stop = () => { /* ... */ };

  return { currentTrack, play, stop };
};
```

- One audio plays at a time (clicking another stops the current)
- Simple progress bar via `timeupdate` event
- Placeholder MP3 files in `/public/audio/`

### Artist ID Card (CSS-Built)

Built entirely with CSS — no canvas or SVG chart library:

- Dark rectangle, `aspect-[2.5/3.5]`
- Orange border (`border-brand-orange`)
- Radar chart: CSS `clip-path: polygon(...)` on a rotated pentagon shape, or a simple SVG inline pentagon
- Text positioned with `absolute` inside a `relative` container

---

## 5. Supabase Integration

### Database Schema

**Table: `founders_signups`**

| Column | Type | Notes |
|---|---|---|
| `id` | uuid (PK) | Auto-generated |
| `email` | text (unique) | User's email |
| `edition_number` | integer | Auto-assigned sequential (1-100) |
| `created_at` | timestamptz | Auto-generated |

### Edge Function or RPC (Recommended)

Use a **Supabase RPC function** for atomic signup to prevent race conditions on `edition_number`:

```sql
CREATE OR REPLACE FUNCTION claim_founders_record(user_email TEXT)
RETURNS JSON AS $$
DECLARE
  existing RECORD;
  next_num INTEGER;
  new_record RECORD;
BEGIN
  -- Check for duplicate
  SELECT * INTO existing FROM founders_signups WHERE email = user_email;
  IF FOUND THEN
    RETURN json_build_object('status', 'duplicate', 'edition_number', existing.edition_number);
  END IF;

  -- Check capacity
  SELECT COALESCE(MAX(edition_number), 0) + 1 INTO next_num FROM founders_signups;
  IF next_num > 100 THEN
    RETURN json_build_object('status', 'sold_out');
  END IF;

  -- Insert
  INSERT INTO founders_signups (email, edition_number)
  VALUES (user_email, next_num)
  RETURNING * INTO new_record;

  RETURN json_build_object('status', 'success', 'edition_number', new_record.edition_number);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Hooks

**`useEmailCapture()`**
```tsx
type CaptureState = 'idle' | 'submitting' | 'success' | 'duplicate' | 'error' | 'sold_out';

interface UseEmailCaptureReturn {
  state: CaptureState;
  editionNumber: number | null;
  submit: (email: string) => Promise<void>;
  reset: () => void;
}
```

**`useScarcityCounter()`**
```tsx
interface UseScarcityCounterReturn {
  remaining: number;
  loading: boolean;
}
```

- Fetches count on mount: `100 - COUNT(*) FROM founders_signups`
- Subscribes to Supabase Realtime for live updates (optional — can poll on interval)
- Falls back to **mock number (73)** if Supabase env vars are missing

### Environment Variables

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Already referenced in `src/lib/supabase.ts`. The client gracefully logs an error if missing — hooks should fall back to mock data.

---

## 6. Responsive Strategy

### Breakpoints (Tailwind Defaults)

| Token | Width | Layout |
|---|---|---|
| Default | < 768px | Mobile — single column, hamburger nav |
| `md` | >= 768px | Tablet — 2-column sections, sidebar hidden or top nav |
| `lg` | >= 1024px | Desktop — full layout, fixed sidebar, 3-column Founders |
| `xl` | >= 1280px | Wide desktop — more breathing room |

### Key Responsive Behaviors

| Section | Mobile | Tablet | Desktop |
|---|---|---|---|
| Sidebar | Hamburger menu | Hamburger or top bar | Fixed left sidebar |
| Hero | Full-width text, no pack visual | Text + smaller pack visual | Full layout per spec |
| Founders | Vertical stack | 2 columns (bag+value) | 3 columns per spec |
| How It Works | Vertical numbered list | 2x2 grid | Horizontal 4-step strip |
| Footer | Stacked, full-width | 2-column | Horizontal row |

---

## 7. Performance Optimizations

| Optimization | Implementation |
|---|---|
| **Video lazy load** | Hero video loads immediately; below-fold content uses `loading="lazy"` |
| **Image format** | Use WebP with PNG fallback. Existing assets are PNG/JPG — convert to WebP |
| **Font preload** | `<link rel="preload">` for Bebas Neue in `index.html` |
| **Code splitting** | Not needed — single page, all sections load together |
| **Tree shaking** | Remove unused packages (three, tone, wavesurfer, etc.) to cut bundle |
| **Image compression** | Compress vending machine + bag images before deploy |

### Estimated Bundle Impact

Current unused deps add significant weight:
- `three.js` ~600KB
- `tone.js` ~300KB
- `wavesurfer.js` ~100KB
- `animejs` ~15KB

Removing these cuts ~1MB from the bundle.

---

## 8. Deployment (Vercel)

### Setup

1. Connect GitHub repo to Vercel
2. Build command: `npm run build` (`tsc -b && vite build`)
3. Output directory: `dist`
4. Environment variables: Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel dashboard
5. Custom domain: `superloop.fm`

### CI/CD

- Push to `main` → auto-deploy to production
- Push to feature branches → preview deployments
- No special CI needed — Vite build is fast

---

## 9. Implementation Phases

### Phase 1: Foundation (Days 1-2)
- Remove unused packages
- Set up font loading (Bebas Neue, JetBrains Mono)
- Convert `index.css` to dark mode brand tokens
- Create `src/lib/constants.ts` with all copy/data
- Create folder structure (`hooks/`, `components/layout/`, `components/sections/`, `components/ui/`)
- Build `Sidebar` and `Footer` components
- Build `App.tsx` layout shell (dark bg, sidebar, section slots)

### Phase 2: Hero + Founders (Days 3-5)
- Build `Hero` section (video bg, headline, CTA)
- Build `EmailCaptureBar` component
- Build `ScarcityCounter` component
- Build `ValueStackPanel` component
- Build `SoundpackContentPanel` + `StemRow` components
- Build `FoundersEdition` three-column section
- Wire up `useEmailCapture` and `useScarcityCounter` hooks
- Set up Supabase table + RPC function

### Phase 3: Supporting Sections (Days 4-6)
- Build `WhatsInside` section + audio preview hook
- Build `HowItWorks` 4-step strip
- Build `RemixWeek` teaser
- Build `ArtistId` teaser + CSS card
- Build `SoundpackUniverse` locked silhouettes
- Build `Community` section (reuses `EmailCaptureBar`)

### Phase 4: Polish + Deploy (Days 7-8)
- Mobile responsive pass (all breakpoints)
- Animation pass (framer-motion section reveals, shimmer effects, glitch transitions)
- Texture pass (scanlines, halftone, noise grain on section backgrounds)
- Performance pass (image compression, font preload, remove dead code)
- Vercel deployment + custom domain
- Supabase production environment variables

---

## 10. Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Placeholder assets not ready by launch | Visual gaps | CSS-built fallbacks for all visuals (colored shapes, gradients) |
| Supabase not configured in time | No email capture | Mock mode with local state counter (already planned) |
| Font loading delay (FOUT) | Flash of unstyled text | Preload + `font-display: swap` |
| Video autoplay blocked (mobile) | No hero background | Fallback to static image with dark overlay |
| 100 signups reached | Counter shows 0 | Show "SOLD OUT" state, disable input, display waitlist alternative |

---

## 11. What NOT to Build (Architectural Boundaries)

These are explicitly out of scope per the spec:

- No user accounts or authentication
- No remix studio or audio editing
- No leaderboard or ranking system
- No Remix Trees visualization
- No payment/Stripe integration
- No real-time signup feed
- No file upload functionality
- No blockchain/wallet integration
- No dark/light mode toggle (always dark)
