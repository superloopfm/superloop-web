import { ArrowDown } from 'lucide-react';
import { HERO } from '../../lib/constants';

export function Hero() {
  const scrollToFounders = () => {
    const el = document.querySelector('#founders');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-screen flex items-start overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          src="/videos/hero-bg.mp4"
          muted
          loop
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-8 lg:pl-60 lg:pr-16 pt-[15vh] md:pt-[17vh]">
        <div className="flex flex-col items-start">

          {/* Orange badge */}
          <div className="bg-[#FF6B35] text-white font-mono text-xs md:text-sm font-bold px-4 py-1.5 uppercase mb-4 flex items-center gap-2">
            <span>&raquo;</span>
            FOUNDERS EDITION — 100 PACKS ONLY
          </div>

          {/* Headline */}
          <h1 className="text-[16vw] md:text-[10vw] lg:text-[7vw] leading-[0.82] font-black tracking-tighter text-white mb-4">
            {HERO.headline[0]}<br />{HERO.headline[1]}
          </h1>

          {/* Sub-headline — morphing spectrum */}
          <div className="mb-8">
            <span
              className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-black uppercase tracking-tight bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, #fff, #a78bfa, #f472b6, #fb923c, #34d399, #60a5fa, #fff)',
                backgroundSize: '300% 100%',
                animation: 'morphGradient 4s ease-in-out infinite',
                WebkitBackgroundClip: 'text',
              }}
            >
              {HERO.subHeadline}
            </span>
          </div>

          {/* CTA */}
          <button
            onClick={scrollToFounders}
            className="group inline-flex items-center gap-3 border-2 border-white text-white px-7 py-4 font-mono font-bold text-sm uppercase tracking-widest hover:bg-[#FF6B35] hover:border-[#FF6B35] hover:text-white transition-all duration-200"
          >
            CLAIM YOUR PACK
            <ArrowDown className="w-5 h-5 group-hover:animate-bounce" />
          </button>

          {/* 3-bag layout below CTA — straight, stacked, center biggest */}
          <button onClick={scrollToFounders} className="mt-8 relative cursor-pointer group h-[48vw] md:h-[38vw] lg:h-[30vw] max-h-[480px] w-[55vw] md:w-[44vw] lg:w-[36vw] max-w-[580px]">
            {/* Left bag — Kaidan, behind left */}
            <img
              src="/images/landing page/kaidan-ronin-pack-1.png"
              alt="Kaidan Soundpack"
              className="absolute left-0 bottom-[4%] h-[85%] w-auto object-contain z-[1] opacity-95 group-hover:scale-[1.02] transition-transform duration-300 drop-shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
            />
            {/* Right bag — Sunset Tempo, behind right, sits lower than Kaidan */}
            <img
              src="/images/landing page/sunsettempo-pack-1.png"
              alt="Sunset Tempo Soundpack"
              className="absolute right-0 bottom-0 h-[85%] w-auto object-contain z-[2] opacity-95 group-hover:scale-[1.02] transition-transform duration-300 drop-shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
            />
            {/* Center bag — Founders, front, 15% bigger */}
            <img
              src="/images/landing page/founders-pack-1.png"
              alt="Founders Edition Pack"
              className="absolute left-1/2 -translate-x-1/2 bottom-0 h-full w-auto object-contain z-[3] group-hover:scale-[1.03] transition-transform duration-300 drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            />
          </button>
        </div>
      </div>

      {/* Top-right corner */}
      <div className="absolute top-4 right-6 z-10 hidden md:flex items-center gap-4">
        <div className="text-right">
          <div className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Issue Date</div>
          <div className="text-sm font-mono font-medium text-white/50">{HERO.issueDate}</div>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <div className="border border-white/10 p-1.5">
          <svg className="w-7 h-7 text-white/30" viewBox="0 0 24 24" fill="currentColor">
            <rect x="1" y="1" width="10" height="10" rx="1" />
            <rect x="13" y="1" width="10" height="10" rx="1" />
            <rect x="1" y="13" width="10" height="10" rx="1" />
            <rect x="15" y="15" width="3" height="3" rx="0.5" />
            <rect x="13" y="19" width="3" height="3" rx="0.5" />
            <rect x="19" y="13" width="3" height="3" rx="0.5" />
            <rect x="19" y="19" width="3" height="3" rx="0.5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
