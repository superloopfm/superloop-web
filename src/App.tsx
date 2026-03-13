import { useState, useRef, useEffect } from 'react';
import { Disc3 } from 'lucide-react';
import { animate } from 'animejs';

import Navigation from './components/Navigation';
import HeroHeader from './components/HeroHeader';
import SoundpackDepot from './components/SoundpackDepot';
import RemixFader from './components/RemixFader';
import VendingMachine from './components/VendingMachine';

export default function App() {
  const [mix, setMix] = useState(0);
  const [playingTab, setPlayingTab] = useState<string | null>(null);
  const [isSyntheticLit, setIsSyntheticLit] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Live countdown to midnight
  const [countdown, setCountdown] = useState("");

  // Ref for Anime.js page-load stagger
  const gridRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (playingTab) {
      vid.play();
    } else {
      vid.pause();
    }
  }, [playingTab]);

  useEffect(() => {
    function calcCountdown() {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      setCountdown(`${h}:${m}:${s}`);
    }
    calcCountdown();
    const id = setInterval(calcCountdown, 1000);
    return () => clearInterval(id);
  }, []);

  // Anime.js: Page load stagger — fast, razor-sharp entrance
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const children = grid.querySelectorAll(':scope > *');
    if (!children.length) return;
    animate(children, {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 400,
      delay: (_el: any, i: number) => i * 60,
      ease: 'outCubic',
    });
  }, []);

  return (
    <div className="bg-zinc-50 text-zinc-950 font-sans antialiased overflow-x-hidden selection:bg-zinc-900 selection:text-white">
      {/* Dither/Gradient Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-100 via-zinc-200 to-zinc-300 opacity-80"></div>
        <div className="absolute inset-0 bg-noise mix-blend-overlay"></div>
      </div>

      {/* Main Grid Container — no max-w constraint, extends to ultrawide edges */}
      <main className="relative z-10 w-full min-h-screen grid grid-cols-[3rem_1fr_3rem] md:grid-cols-[14rem_1fr_4rem] border-x border-zinc-300 bg-transparent" style={{ '--mix': mix / 100, '--pad1': 0, '--pad2': 0 } as React.CSSProperties}>

        {/* LEFT MARGIN: Navigation Sidebar */}
        <Navigation />

        {/* CENTER CONTENT: Swiss Grid Layout */}
        <section ref={gridRef} className="relative w-full h-full grid grid-cols-1 lg:grid-cols-12 grid-rows-[auto_auto_1fr] gap-0">

          {/* Hero Header + Title Row */}
          <HeroHeader isSyntheticLit={isSyntheticLit} setIsSyntheticLit={setIsSyntheticLit} />

          {/* ROW 2: Asymmetrical Content Blocks */}
          <div className="col-span-1 lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 min-h-[40vh]">

            {/* Remix Fader + Product Showcase */}
            <RemixFader mix={mix} setMix={setMix} videoRef={videoRef} />

            {/* Soundpack Depot */}
            <SoundpackDepot playingTab={playingTab} setPlayingTab={setPlayingTab} countdown={countdown} />

          </div>

        </section>

        {/* Vending Machine — Full-width dark editorial block */}
        <VendingMachine />

        {/* RIGHT MARGIN: Technical Specs */}
        <aside className="relative border-l border-zinc-300 h-full hidden md:flex flex-col py-12 bg-zinc-50/50 backdrop-blur-sm">
          <div className="flex-1 flex flex-col items-center gap-12">
            {/* Vertical Progress Bar */}
            <div className="relative h-32 w-1 bg-zinc-200 rounded-full overflow-hidden">
              <div className="absolute bottom-0 w-full h-1/3 bg-zinc-900"></div>
            </div>
            {/* Vertical Text */}
            <div className="rotate-180 [writing-mode:vertical-rl] text-[0.65rem] font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-8 whitespace-nowrap">
              <span>Print_Res_300DPI</span>
              <span>CMYK_Color_Profile</span>
              <span>Bleed_3mm</span>
            </div>
          </div>
          {/* Bottom Icon */}
          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="rotate-180 [writing-mode:vertical-rl] text-[10px] font-mono text-zinc-900">LOAD "ERROR",8,1</div>
            <Disc3 className="w-5 h-5 text-zinc-900 animate-[spin_4s_linear_infinite]" />
          </div>
        </aside>



      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-black text-zinc-500 py-12 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Footer Left - Links */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 font-mono text-xs text-center md:text-left">
            <a href="#privacy" className="hover:text-white transition-colors uppercase tracking-wider">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors uppercase tracking-wider">Terms & Conditions</a>
            <a href="#rules" className="hover:text-white transition-colors uppercase tracking-wider text-fuchsia-500">Official Sweepstakes Rules</a>
          </div>

          {/* Footer Right - Legal Copy */}
          <div className="text-center md:text-right font-mono text-[9px] sm:text-[10px] space-y-2">
            <p>No purchase necessary to enter or win. Void where prohibited by law.</p>
            <p>Open to legal US residents 18+. See Official Rules for full prize tier details and ARV.</p>
            <p className="mt-4 text-zinc-600">© 2026 SUPERLOOP. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
