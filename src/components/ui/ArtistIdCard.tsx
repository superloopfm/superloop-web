export function ArtistIdCard() {
  return (
    <div className="relative aspect-[2.5/3.5] w-full max-w-[280px] bg-brand-dark border-2 border-white/20 p-4 flex flex-col justify-between overflow-hidden">
      {/* Subtle grid texture */}
      <div className="absolute inset-0 dot-grid opacity-10" />

      {/* Top */}
      <div className="relative z-10">
        <div className="font-display text-4xl md:text-5xl text-white tracking-wider leading-none">
          PWR 3847
        </div>
        <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">
          CIRCULATE ENDLESS
        </div>
      </div>

      {/* Center — Radar chart shape */}
      <div className="relative z-10 flex items-center justify-center py-6">
        <svg viewBox="0 0 100 100" className="w-28 h-28 opacity-60">
          {/* Outer pentagon */}
          <polygon
            points="50,5 95,35 82,90 18,90 5,35"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />
          {/* Mid pentagon */}
          <polygon
            points="50,20 80,40 72,78 28,78 20,40"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.5"
          />
          {/* Inner pentagon */}
          <polygon
            points="50,35 65,45 62,65 38,65 35,45"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.5"
          />
          {/* Stats shape */}
          <polygon
            points="50,10 88,38 60,85 22,70 15,38"
            fill="rgba(255,255,255,0.05)"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          {/* Stat dots */}
          <circle cx="50" cy="10" r="2.5" fill="#FFFFFF" />
          <circle cx="88" cy="38" r="2.5" fill="#FFFFFF" />
          <circle cx="60" cy="85" r="2.5" fill="#FFFFFF" />
          <circle cx="22" cy="70" r="2.5" fill="#FFFFFF" />
          <circle cx="15" cy="38" r="2.5" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Bottom */}
      <div className="relative z-10 flex justify-between items-end">
        <div>
          <div className="font-mono text-[9px] text-white/30 uppercase">FOUNDERS EDITION</div>
          <div className="font-mono text-xs text-white font-bold">047</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[9px] text-white/30 uppercase">STREAK</div>
          <div className="font-mono text-xs text-white font-bold">42 DAYS</div>
        </div>
      </div>

      {/* Scanline overlay */}
      <div className="absolute inset-0 scanlines opacity-20" />
    </div>
  );
}
