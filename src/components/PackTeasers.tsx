import { Lock } from 'lucide-react';

const UPCOMING_PACKS = [
  {
    id: 'KAIDAN',
    title: 'KAIDAN',
    subtitle: '怪談 // GHOST_FREQUENCIES',
    bpm: '90-110 BPM',
    tag: 'DARK AMBIENT',
    accent: 'from-purple-600 to-indigo-900',
    border: 'border-purple-500/40',
  },
  {
    id: 'SUNSET_TEMPO',
    title: 'SUNSET TEMPO',
    subtitle: 'GOLDEN_HOUR // DOWNTEMPO',
    bpm: '85-100 BPM',
    tag: 'LO-FI BREAKS',
    accent: 'from-orange-500 to-rose-600',
    border: 'border-orange-500/40',
  },
];

export default function PackTeasers() {
  return (
    <div className="col-span-1 lg:col-span-12 bg-zinc-950 border-t border-zinc-800 py-8 px-4 sm:px-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px bg-zinc-700 flex-1"></div>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">Incoming_Transmissions</span>
        <div className="h-px bg-zinc-700 flex-1"></div>
      </div>

      {/* Pack Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {UPCOMING_PACKS.map((pack) => (
          <div
            key={pack.id}
            className={`relative border ${pack.border} bg-zinc-900/80 p-4 overflow-hidden group`}
          >
            {/* Gradient accent bar */}
            <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${pack.accent}`}></div>

            {/* Lock badge */}
            <div className="flex justify-between items-start mb-3">
              <span className="font-mono text-[9px] bg-white/10 text-white/60 px-1.5 py-0.5 uppercase tracking-wider">Coming Soon</span>
              <Lock className="w-3.5 h-3.5 text-zinc-600" />
            </div>

            {/* Pack Title */}
            <h3 className="font-black text-xl sm:text-2xl uppercase tracking-tighter text-white leading-none mb-1">
              {pack.title}
            </h3>

            {/* Subtitle */}
            <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-4">
              {pack.subtitle}
            </div>

            {/* Meta row */}
            <div className="flex justify-between items-end border-t border-zinc-800 pt-2 mt-auto">
              <span className="font-mono text-[9px] text-zinc-600">{pack.bpm}</span>
              <span className="font-mono text-[9px] text-zinc-600">{pack.tag}</span>
            </div>

            {/* Scanline overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)]"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
