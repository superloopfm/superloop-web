// ============================================================
// Superloop.fm Landing Page — Centralized Constants
// ============================================================

// --- Navigation ---
export const NAV_ITEMS = [
  { label: 'HOME', href: '#' },
  { label: 'CLAIM', href: '#founders' },
  { label: 'REMIX WEEK', href: '#remix-week' },
  { label: 'ARTIST ID', href: '#artist-id' },
  { label: 'STUDIO', href: '#studio' },
] as const;

// --- Hero Copy ---
export const HERO = {
  badge: 'FOUNDERS EDITION — 100 PACKS ONLY',
  headline: ['THE REMIX', 'PLAYGROUND'],
  subHeadline: 'COMPETE. LEVEL UP. GET SIGNED.',
  cta: 'CLAIM YOUR PACK',
  issueDate: 'MAR 2026',
} as const;

// --- Founders Value Stack ---
export const VALUE_ITEMS = [
  { label: 'FOUNDERS VAULT', desc: '3-5 unreleased tracks + stems, Founders-only forever', value: '$97' },
  { label: 'FOUNDERS BADGE #001-100', desc: 'Numbered, never reprinted, permanent', value: '$49' },
  { label: 'FOUNDERS PLUGIN PASS', desc: 'Exclusive skins + early access on every plugin', value: '$99' },
  { label: 'SEASON 01 ENTRY', desc: 'Guaranteed Remix Week slot, skip the waitlist', value: '$25' },
  { label: 'FIRST ACCESS PASS', desc: 'Every new drop, you\'re first in line', value: '$50' },
  { label: '2026 VAULT ACCESS', desc: 'Exclusive drops delivered to Founders only, all year', value: '$97' },
] as const;

export const VALUE_TOTAL = '$417+';
export const VALUE_PRICE = 'FREE';

// --- Soundpack Stems ---
export interface Stem {
  tag: string;
  name: string;
  description: string;
  icon: 'disc' | 'mic' | 'zap' | 'lock';
  status: 'download' | 'locked';
  audioSrc?: string;
}

export const STEMS: Stem[] = [
  { tag: 'A-01', name: 'ACID_WASHED_BREAKBEATS', description: '170BPM / DISTORTED', icon: 'disc', status: 'download', audioSrc: '/audio/stem-01.mp3' },
  { tag: 'A-02', name: 'VOCAL_CHOPS_GLITCH', description: 'STUTTER FX', icon: 'mic', status: 'download', audioSrc: '/audio/stem-02.mp3' },
  { tag: 'B-01', name: 'INDUSTRIAL_KICKS', description: 'HARD CLIPPING', icon: 'zap', status: 'download', audioSrc: '/audio/stem-03.mp3' },
  { tag: 'B-02', name: 'SECRET_STEMS_V2', description: 'LOCKED UNTIL CLAIM', icon: 'lock', status: 'locked' },
];

// Extended stem list for "What's Inside" section
export const EXTENDED_STEMS: Stem[] = [
  ...STEMS.slice(0, 3),
  { tag: 'A-04', name: '[LOCKED]', description: 'UNLOCKS ON CLAIM', icon: 'lock', status: 'locked' },
  { tag: 'A-05', name: '[LOCKED]', description: 'UNLOCKS ON CLAIM', icon: 'lock', status: 'locked' },
];

// --- How It Works ---
export const STEPS = [
  { number: '01', title: 'COLLECT', desc: 'Grab a soundpack from the machine.' },
  { number: '02', title: 'REMIX', desc: 'Make it yours with our tools.' },
  { number: '03', title: 'COMPETE', desc: 'Enter Remix Week and prove it.' },
  { number: '04', title: 'GET SIGNED', desc: 'The best get published on Spotify.' },
] as const;

// --- Artist ID Tiers ---
export const ARTIST_TIERS = ['GUEST', 'APPRENTICE', 'ARTIST ID', 'LEGEND'] as const;

// --- Social Links ---
export const SOCIALS = [
  { name: 'Discord', href: '#', icon: 'discord' },
  { name: 'TikTok', href: '#', icon: 'tiktok' },
  { name: 'Instagram', href: '#', icon: 'instagram' },
  { name: 'X', href: '#', icon: 'twitter' },
] as const;

// --- Scarcity ---
export const TOTAL_FOUNDERS = 100;
export const MOCK_REMAINING = 73;
