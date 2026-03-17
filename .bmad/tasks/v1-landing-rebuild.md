# SUPERLOOP.FM — Landing Page Rebuild (V1 Restoration)

## Project Context
We are completely overhauling the V1 landing page based on the restored `v1-layout-restoration` branch. The centerpiece of this redesign is an interactive "Vending Machine" floor for the Founders Edition soundpack, featuring an inline Supabase email capture.

## 1. Hero Section Refinements
- **Remove**: The party photo background and the Dreamwarden record.
- **Background**: Replace with a black background featuring a subtle grain texture.
- **Headline**: "THE REMIX PLAYGROUND"
- **Sub-headline**: "Collect limited soundpacks. Remix them your way. Get published everywhere."
- **Eyebrow**: "FOUNDERS EDITION — 100 RECORDS ONLY"
- **Right side**: Display the Founders Edition soundpack circular artwork. Give it a slow, continuous spin animation on idle.
- **CTA**: Add a "CLAIM YOUR RECORD ↓" button that smooth-scrolls the user right down to the Vending Machine section.

## 2. Value Strip
- **Location**: Below the Hero section.
- **Structure**: A 4-item horizontal strip taking full width. Small icons and monospace font.
- **Content**: "COLLECT LIMITED SOUNDPACKS · REMIX YOUR WAY · GET PUBLISHED EVERYWHERE · BATTLE & EARN"

## 3. Vending Machine Floor (The Core Interaction)
- **Container**: A massive center section. Use a 2D PNG export from Blender of a vending machine as the background container. (If the asset is not yet provided in `public/assets/`, use a visually distinct placeholder container with correct proportions).
- **Layout**: Center the active Founders Edition machine (colorful, glowing). Flank it with 2-3 disabled/locked machines (Kaidan, Dreamwarden, Sunset Tempo) that are dimmed with a "COMING SOON" overlay.
- **Interactivity**: 
  - The soundpack records must be separate circular PNGs, absolutely positioned over the slots on the machine asset.
  - When the user clicks the Founders Edition slot, trigger a smooth CSS spin animation on the record.
  - Change the machine screen's `div` background to match the pack's themed color/gradient.
  - **CRITICAL**: Clicking the slot triggers an inline email capture form right on the machine screen (do NOT use a modal).

## 4. Inline Supabase Email Capture
- **Location**: Inline, inside the Founders Edition vending machine slot/screen area when clicked.
- **Form UI**: Display the soundpack artwork + text: "This is not a waitlist. This is a record." + an email input field + a "CLAIM" button.
- **Scarcity Counter**: Show "[X] of 100 remaining".
- **Backend (Supabase)**:
  - You will need to write the SQL migration/script to create a table for `email_captures` (email, timestamp) and maintain the `founders_remaining` counter.
  - Setup Supabase Realtime so that the counter syncs live across tabs (if someone claims a record, it drops from 100 to 99 for everyone observing the page).
- **Success State**: Play a "collected" animation and display a confirmation message instead of the form.

## 5. Remix Week Teaser & The Loop
- **Remix Week Teaser**:
  - Main text: "REMIX WEEK — SEASON 01 — COMING SOON"
  - Sub: "One soundpack. One week. Everyone remixes. The best get published."
  - Tag: "FOUNDERS GET EARLY ACCESS"
- **The Loop (How It Works)**:
  - 01 COLLECT → 02 REMIX → 03 PUBLISH → 04 BATTLE & GROW
  - Accompanying text: "Every loop leaves a trace."

## 6. Footer & Second Email Capture
- **Second Email Capture**: Add a secondary, full-width section near the footer. Include the exact same Realtime scarcity counter + email field + "CLAIM YOUR FOUNDERS EDITION RECORD" phrase.
- **Navigation Updates**:
  - Keep: Soundpacks, Remix Week, Leaderboard
  - Modify: Artist ID (Make it visible but grayed out with a "COMING SOON" badge)
  - Remove: Studio/Remix, Remix Trees
- **Footer text**: Social links + "Every loop leaves a trace."

## 7. Technical Requirements
- **Mobile Responsiveness**: 
  - Sidebar navigation must collapse to a hamburger menu.
  - The Vending Machines must stack vertically on mobile screens.
  - Background effects should switch to a CSS-only "Mode B" for performance.
- **Analytics**: Install the scaffolding for Plausible analytics (we will configure the specific domains/keys later if missing).
- **Database**: The Supabase URL and Keys are already in `.env`. Ensure the real-time Supabase connection is robust and handles errors gracefully. You will need to install `@supabase/supabase-js`.

**CRITICAL INSTRUCTION FOR CLAUDE:**
DO NOT ASK TO ENTER PLAN MODE. DO NOT PAUSE FOR APPROVAL. PROCEED DIRECTLY WITH EXECUTION, INSTALLING DEPENDENCIES, AND WRITING CODE.

Please execute these changes carefully on the `v1-layout-restoration` branch, committing locally as you reach stable milestones.
