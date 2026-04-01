import { useState, useEffect, useRef } from 'react';
import { Package, Lock, Disc, Mic2, Zap } from 'lucide-react';
import { EmailCaptureBar } from '../ui/EmailCaptureBar';
import { STEMS } from '../../lib/constants';

const ICON_MAP = { disc: Disc, mic: Mic2, zap: Zap, lock: Lock };

const VALUE_ITEMS = [
  { num: '01', title: 'FOUNDERS VAULT', desc: '3-5 unreleased tracks + stems, Founders-only forever' },
  { num: '02', title: 'BADGE #001-100', desc: 'Numbered edition, never reprinted, permanent status' },
  { num: '03', title: 'PLUGIN PASS', desc: 'Exclusive skins, early access on every plugin drop' },
  { num: '04', title: 'SEASON 01 ENTRY', desc: 'Guaranteed Remix Week slot, skip the waitlist' },
  { num: '05', title: 'FIRST ACCESS PASS', desc: 'Every new drop, you\'re first in line' },
  { num: '06', title: '2026 VAULT ACCESS', desc: 'Exclusive drops delivered to Founders only, all year' },
];

export function FoundersEditionAlt() {
  const [activeStem, setActiveStem] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleStemClick = (tag: string) => {
    setActiveStem(activeStem === tag ? null : tag);
  };

  return (
    <section id="founders" className="relative bg-brand-black pt-10 md:pt-12">
      {/* Section header */}
      <div className="px-6 lg:pl-56 lg:pr-12 pb-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none bg-clip-text text-transparent" style={{
          backgroundImage: 'linear-gradient(90deg, #fff, #a78bfa, #f472b6, #fb923c, #34d399, #60a5fa, #fff)',
          backgroundSize: '300% 100%',
          animation: 'morphGradient 4s ease-in-out infinite',
          WebkitBackgroundClip: 'text',
        }}>
          FOUNDERS EDITION
        </h2>
        <div className="font-mono text-sm md:text-base text-white/50 uppercase tracking-wider mt-3">
          100 FOUNDERS. FIRST ACCESS. EVERY DROP. FOREVER.
        </div>
      </div>

      {/* Three-column layout */}
      <div className="px-6 lg:pl-56 lg:pr-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-0">

          {/* LEFT: Vending Machine */}
          <div className="hidden lg:block lg:col-span-4 bg-brand-black relative overflow-hidden">
            <img src="/images/landing page/vending-temp-1.png" alt="Vending Machine" className="w-full h-auto object-contain" />
          </div>

          {/* CENTER: 3-card stack */}
          <div className="md:col-span-1 lg:col-span-3 bg-brand-darker flex items-start justify-center pt-3 px-4 pb-4 relative overflow-hidden">
            <div className="relative w-full max-w-[380px] mx-auto">
              <div className="absolute top-6 left-6 w-full z-0">
                <img src="/images/landing page/founders-black-soundpack-card.png" alt="" className="w-full h-auto object-contain opacity-30" />
              </div>
              <div className="absolute top-3 left-3 w-full z-[1]">
                <img src="/images/landing page/founders-black-soundpack-card.png" alt="" className="w-full h-auto object-contain opacity-55" />
              </div>
              <div className="relative z-10">
                <img src="/images/landing page/founders-white-soundpack-card.png" alt="Founders Edition Card" className="w-full h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]" />
              </div>
            </div>
          </div>

          {/* RIGHT: ALTERNATE — Stem tabs FIRST, then title bar, then value list */}
          <div className="md:col-span-1 lg:col-span-5 flex flex-col bg-brand-black">

            {/* Stem tabs FIRST — header merged into title bar below */}
            <div>
              <div className="p-3 flex flex-col gap-2">
                {STEMS.map((stem) => {
                  const isLocked = stem.status === 'locked';
                  const isActive = activeStem === stem.tag;
                  const Icon = ICON_MAP[stem.icon];
                  return (
                    <button
                      key={stem.tag}
                      disabled={isLocked}
                      onClick={() => !isLocked && handleStemClick(stem.tag)}
                      className={`group w-full text-left p-3 transition-all duration-150 select-none ${
                        isLocked
                          ? 'bg-white/[0.02] border-2 border-white/5 opacity-40 cursor-not-allowed'
                          : isActive
                            ? 'bg-[#FF6B35] border-2 border-[#FF6B35] text-black shadow-none translate-x-[3px] translate-y-[3px]'
                            : 'bg-white border-2 border-black text-black shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className={`text-[9px] px-1 font-mono font-bold ${
                          isLocked ? 'bg-white/10 text-white/30'
                            : isActive ? 'bg-black text-[#FF6B35]'
                            : 'bg-black text-white'
                        }`}>
                          {stem.tag}
                        </span>
                        {isLocked
                          ? <Lock className="w-4 h-4 text-white/20" />
                          : <Icon className={`w-4 h-4 ${isActive ? 'text-black/60 animate-spin' : 'text-black/40'}`} />
                        }
                      </div>
                      <h3 className={`font-bold text-sm leading-tight uppercase mb-1 ${isLocked ? 'text-white/30' : 'text-black'}`}>
                        {stem.name}
                      </h3>
                      <div className={`flex justify-between items-end border-t border-dashed pt-1 mt-1 ${isLocked ? 'border-white/10' : isActive ? 'border-black/20' : 'border-black/15'}`}>
                        <span className={`text-[9px] font-mono ${isLocked ? 'text-white/20' : isActive ? 'text-black/60' : 'text-black/40'}`}>
                          {stem.description}
                        </span>
                        <span className={`font-bold text-xs ${isLocked ? 'text-white/20' : isActive ? 'text-black font-black' : 'text-black'}`}>
                          {isLocked ? 'LOCKED' : isActive ? 'PLAYING' : 'DOWNLOAD'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Founders Edition title bar — merged */}
            <div className="bg-white text-black px-6 py-5 flex items-center justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest opacity-40">SP FOUNDERS // VOL.1</div>
                <h3 className="font-black text-2xl md:text-3xl uppercase tracking-tighter leading-none mt-1">FOUNDERS EDITION — CONTENT</h3>
              </div>
              <div className="font-mono text-[10px] text-black/40 uppercase tracking-widest text-right">
                100 NUMBERED<br />LIMITED RUN
              </div>
            </div>

            {/* Content list */}
            <div ref={sectionRef} className="bg-white/[0.04] px-6 md:px-8 py-6 md:py-8">
              <div className="flex flex-col gap-4 md:gap-5">
                {VALUE_ITEMS.map((item, i) => (
                  <div
                    key={item.num}
                    className="flex items-baseline gap-4 transition-all duration-400"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateY(0)' : 'translateY(12px)',
                      transitionDelay: `${i * 120}ms`,
                    }}
                  >
                    <span className="font-mono text-lg md:text-xl font-bold text-[#FF6B35] shrink-0 w-8">{item.num}</span>
                    <div className="flex-1 border-b border-dashed border-white/10 pb-3">
                      <span
                        className="font-mono text-sm md:text-base font-bold uppercase bg-clip-text text-transparent"
                        style={{
                          backgroundImage: 'linear-gradient(90deg, #fff, #c4b5fd, #f9a8d4, #fdba74, #6ee7b7, #93c5fd, #fff)',
                          backgroundSize: '300% 100%',
                          animation: `morphGradient ${6 + i * 0.5}s ease-in-out infinite`,
                          WebkitBackgroundClip: 'text',
                        }}
                      >
                        {item.title}
                      </span>
                      <span className="font-mono text-xs md:text-sm text-white/50 ml-3">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-white/10 font-mono">
                <div className="text-base md:text-lg text-white/50">
                  TOTAL VALUE: <span className="text-white font-bold">$417+</span>
                </div>
                <div className="text-xl md:text-2xl text-white font-bold mt-1">
                  YOUR PRICE: <span className="bg-clip-text text-transparent" style={{
                    backgroundImage: 'linear-gradient(90deg, #34d399, #60a5fa, #a78bfa, #f472b6)',
                    backgroundSize: '300% 100%',
                    animation: 'morphGradient 3s ease-in-out infinite',
                    WebkitBackgroundClip: 'text',
                  }}>FREE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Capture Bar */}
      <EmailCaptureBar />
    </section>
  );
}
