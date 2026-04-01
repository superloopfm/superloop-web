# Superloop.fm Landing Page — Epics & Stories

**Sprint Window:** April 1-11, 2026 (11 days)
**Target:** Live on superloop.fm by April 11

---

## Epic 1: Foundation & Cleanup (P0)

### Story 1.1: Remove Unused Dependencies
- Remove `three`, `@types/three`, `tone`, `wavesurfer.js`, `xsound`, `audiomotion-analyzer`, `animejs`, `react-router-dom`, `@iconify/react`
- Run `npm install` to clean lockfile
- Verify build still passes
- **AC:** Bundle size reduced, no import errors

### Story 1.2: Font System Setup
- Add Google Fonts link to `index.html` for Bebas Neue + JetBrains Mono
- Add `<link rel="preload">` for display font
- Define `--font-display`, `--font-mono`, `--font-body` in `@theme` block
- **AC:** Fonts load on page, visible in dev tools

### Story 1.3: Dark Mode Brand Conversion
- Replace all light theme tokens (`zinc-50`, `zinc-100`, etc.) with dark equivalents
- Set `--color-brand-orange: #FF6B35`, `--color-brand-black: #0A0A0A`
- Update `bg-noise`, `crt-grain`, grid utilities for dark backgrounds
- Add new texture utilities: `.scanlines`, `.halftone`, `.dot-grid`
- **AC:** Page is full dark mode, brand orange accents visible

### Story 1.4: Project Structure & Constants
- Create folder structure: `hooks/`, `components/layout/`, `components/sections/`, `components/ui/`
- Create `src/lib/constants.ts` with all copy, stem data, nav items, value stack items
- **AC:** All hardcoded strings are centralized, folders exist

---

## Epic 2: Layout Shell (P0)

### Story 2.1: Sidebar Navigation
- Fixed left sidebar, monospace font, small caps
- Four nav items: SOUNDPACKS, REMIX WEEK, ARTIST ID, FOUNDERS
- Vertical line connecting items
- Smooth-scroll to section IDs on click
- IntersectionObserver to highlight active section
- Mobile: hamburger menu with slide-out overlay
- **AC:** Nav works on desktop + mobile, smooth-scrolls to sections

### Story 2.2: Footer
- Nav links (same 4 items), legal links (Terms, Privacy), social icons (Discord, TikTok, Instagram, X)
- Tagline: "EVERY LOOP LEAVES A TRACE."
- Copyright: "2026 DRASTIC MUSIC LLC"
- **AC:** Footer renders, links scroll to sections

### Story 2.3: App Layout Shell
- Replace current `App.tsx` with layout shell
- Dark background, sidebar, main content area, footer
- Section ID anchors for each section
- CRT grain overlay
- **AC:** Page loads with dark bg, sidebar visible, all section slots exist

---

## Epic 3: Hero Section (P0)

### Story 3.1: Hero — Video Background + Headline
- Full viewport height section
- Background video (autoplay, muted, loop) with dark overlay
- Dot-grid texture overlay on video
- Left-aligned text stack: orange badge, display headline, sub-headline
- **AC:** Video plays, text readable over overlay, mobile-responsive

### Story 3.2: Hero — CTA + Right Visual
- "CLAIM YOUR RECORD" button, smooth-scrolls to Founders section
- Right side: Founders bag placeholder image with subtle float animation
- Top-right: issue date "MAR 2026" + QR code placeholder
- **AC:** CTA scrolls to section 2, visual bridges to next section

---

## Epic 4: Founders Edition (P0)

### Story 4.1: Value Stack Panel
- "WHAT FOUNDERS GET" header
- 6 value items with dot leaders and dollar amounts
- "TOTAL VALUE: $417+" and "YOUR PRICE: FREE" — large display font
- Orange accents on dollar values
- **AC:** Panel renders with correct copy, dramatic price gap visible

### Story 4.2: Soundpack Content Panel
- Terminal-style header bar with "SOUNDPACK_CONTENT V.4.0"
- 4 stem rows (3 active + 1 locked)
- Each row: tag, name, description, icon, download/locked status
- Locked row grayed out with lock icon
- **AC:** Panel renders with terminal aesthetic, locked row distinct

### Story 4.3: Founders Three-Column Layout
- Left: Vending machine placeholder image with slot grid
- Center: Founders bag image + peeking card edges
- Right: Value stack (top) + soundpack content (bottom)
- Responsive: 3-col → 2-col → 1-col
- **AC:** Layout matches Figma reference at all breakpoints

### Story 4.4: Email Capture Bar
- Full-width bar below columns
- Scarcity counter (large, centered, orange)
- Email input + "CLAIM YOUR RECORD" button
- Micro-copy: "FREE. INSTANT ACCESS. NO CREDIT CARD."
- **AC:** UI renders, input accepts email, button is styled

### Story 4.5: Supabase Email Integration
- Create `founders_signups` table in Supabase
- Create `claim_founders_record` RPC function
- Wire `useEmailCapture` hook to Supabase
- Wire `useScarcityCounter` hook (with mock fallback)
- Handle success, duplicate, error, sold_out states
- **AC:** Email submits to Supabase, counter updates, states display correctly

---

## Epic 5: Supporting Sections (P1)

### Story 5.1: What's Inside — Stem List + Audio Preview
- Left: Pack artwork (reuse from Section 2)
- Right: Expanded stem list with play/pause preview buttons
- `useAudioPreview` hook — one audio at a time, simple progress bar
- Locked stems blurred with lock icon
- Placeholder MP3 files in `/public/audio/`
- **AC:** Audio plays on click, stops on next click, locked stems can't play

### Story 5.2: How It Works — 4-Step Strip
- Horizontal strip: COLLECT → REMIX → COMPETE → GET SIGNED
- Large numbers (01-04), titles, descriptions
- Connected by horizontal line
- Mobile: vertical stack
- **AC:** 4 steps render, responsive at all breakpoints

### Story 5.3: Soundpack Universe — Locked Machines
- Short section (30-40vh)
- 2 dark machine silhouettes with colored glow borders
- Machine 1: gold glow (#DAA520) — "SEASON 01"
- Machine 2: red glow (#8B0000) — "ENCRYPTED"
- **AC:** Silhouettes visible with glow, not interactive

### Story 5.4: Remix Week — Teaser
- Left: Placeholder competition image
- Right: Headline + body copy + orange badge
- Badge click scrolls back to Founders section
- Status: "SEASON 01 — COMING SOON"
- **AC:** Section renders, badge scrolls to section 2

### Story 5.5: Artist ID — Teaser + CSS Card
- Left: Copy with tier strip (GUEST → APPRENTICE → ARTIST ID → LEGEND)
- Right: CSS-built Artist ID card (dark rect, orange border, radar chart shape, stats)
- **AC:** Card renders with CSS only, no images required

### Story 5.6: Community — Second Email Capture
- Display headline: "JOIN THE NOISE"
- Social icon row (Discord, TikTok, Instagram, X)
- Second `EmailCaptureBar` instance (shared state with Section 2)
- **AC:** Same counter, same backend, social links present

---

## Epic 6: Polish & Deploy (P0)

### Story 6.1: Mobile Responsive Pass
- Test all sections at 375px, 768px, 1024px, 1280px
- Sidebar → hamburger
- Three-column → stack
- Fix any overflow, font scaling, spacing issues
- **AC:** No horizontal scroll, all content accessible on mobile

### Story 6.2: Animation Pass
- Framer-motion section reveal on scroll (fade-in-up)
- Hero bag float animation
- Founders bag shimmer effect
- Scarcity counter number animation on load
- Glitch transition on hover states
- **AC:** Animations are subtle, not distracting, no jank

### Story 6.3: Performance Pass
- Remove all dead code from old `App.tsx`
- Convert images to WebP
- Compress hero video
- Verify font preload working
- Lighthouse score > 90
- **AC:** Bundle < 500KB (excluding media), fast LCP

### Story 6.4: Vercel Deployment
- Connect repo to Vercel
- Set environment variables
- Configure custom domain (superloop.fm)
- Test production build
- **AC:** Site live at superloop.fm, email capture works in production

---

## Story Dependency Map

```
1.1 → 1.2 → 1.3 → 1.4 → 2.1 + 2.2 + 2.3 (parallel)
                              ↓
                         3.1 → 3.2
                              ↓
                    4.1 + 4.2 (parallel) → 4.3 → 4.4 → 4.5
                              ↓
              5.1 + 5.2 + 5.3 + 5.4 + 5.5 + 5.6 (parallel)
                              ↓
                    6.1 → 6.2 → 6.3 → 6.4
```

---

## Sprint Schedule (Suggested)

| Day | Date | Stories | Focus |
|---|---|---|---|
| 1 | Apr 1 | 1.1, 1.2, 1.3, 1.4 | Foundation cleanup |
| 2 | Apr 2 | 2.1, 2.2, 2.3 | Layout shell |
| 3 | Apr 3 | 3.1, 3.2 | Hero section |
| 4 | Apr 4 | 4.1, 4.2 | Founders panels |
| 5 | Apr 5 | 4.3, 4.4 | Founders layout + email UI |
| 6 | Apr 6 | 4.5 | Supabase integration |
| 7 | Apr 7 | 5.1, 5.2 | What's Inside + How It Works |
| 8 | Apr 8 | 5.3, 5.4, 5.5 | Teaser sections |
| 9 | Apr 9 | 5.6, 6.1 | Community + responsive |
| 10 | Apr 10 | 6.2, 6.3 | Animation + performance |
| 11 | Apr 11 | 6.4 | Deploy + go live |
