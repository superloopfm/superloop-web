import { useState } from 'react';
import { Disc3, ArrowDown } from 'lucide-react';

interface RemixFaderProps {
  mix: number;
  setMix: (val: number) => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export default function RemixFader({ mix, setMix, videoRef }: RemixFaderProps) {
  const [pad1, setPad1] = useState(false);
  const [pad2, setPad2] = useState(false);

  return (
    <>
      {/* Block A: Remix Week (Left) — bleeds into left margin */}
      <div className="col-span-1 lg:col-span-5 border-r border-zinc-300 -ml-[3rem] md:-ml-[14rem] pl-[3rem] md:pl-[14rem] pr-4 sm:pr-6 py-6 flex flex-col justify-between bg-[#050505] text-white overflow-hidden">
        <div className="select-none">
          {/* Glitch sliced typography */}
          <div className="glitch-wrapper glitch-wrapper-pad2 mb-6">
            <div className="glitch-base">REMIX_WEEK</div>
            <div className="glitch-layer slice-top">REMIX_WEEK</div>
            <div className="glitch-layer slice-mid">REMIX_WEEK</div>
            <div className="glitch-layer slice-bot">REMIX_WEEK</div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-px bg-white w-12"></div>
            <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">ISSUE_01.2 // DECONSTRUCTION_PHASE</p>
          </div>
        </div>

        {/* Remix Image with overlay */}
        <div className="relative mt-4 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop"
            alt="Remix Laboratory"
            className="w-full h-48 md:h-64 object-cover remix-img-pad"
          />
          {/* Dashed border overlay */}
          <div className="absolute inset-3 border border-dashed border-white/30 pointer-events-none"></div>
          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          ></div>
          {/* Label */}
          <div className="absolute bottom-3 left-3 font-mono text-[9px] text-white/50 uppercase tracking-widest">RMX_LAB // INPUT_FEED</div>
        </div>

        {/* Hardware Controls */}
        <div className="flex items-center gap-4 mt-4 flex-wrap">

          {/* Fader — short horizontal DJ-style */}
          <div className="flex flex-col items-start gap-1">
            <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">MIX</span>
            <div className="relative flex items-center w-28 h-6 bg-zinc-900 border border-zinc-700 rounded-sm shadow-inner">
              <div className="absolute inset-y-0 left-0 right-0 flex items-center px-1">
                <div className="w-full h-px bg-zinc-600"></div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={mix}
                onChange={(e) => setMix(Number(e.target.value))}
                className="relative w-full appearance-none bg-transparent h-6 outline-none cursor-pointer fader-input"
              />
            </div>
          </div>

          {/* MPC Pads */}
          <div className="flex flex-col items-start gap-1">
            <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">PADS</span>
            <div className="flex gap-2">
              <button
                className="w-12 h-12 rounded bg-zinc-800 border-b-4 border-zinc-900 active:border-b-0 active:translate-y-1 shadow-inner transition-all select-none"
                style={{ boxShadow: pad1 ? 'inset 0 2px 6px rgba(255,51,0,0.6)' : 'inset 0 2px 4px rgba(0,0,0,0.8)' }}
                onMouseDown={() => setPad1(true)}
                onMouseUp={() => setPad1(false)}
                onMouseLeave={() => setPad1(false)}
              >
                <span className="font-mono text-[8px] text-zinc-500">A1</span>
              </button>
              <button
                className="w-12 h-12 rounded bg-zinc-800 border-b-4 border-zinc-900 active:border-b-0 active:translate-y-1 shadow-inner transition-all select-none"
                style={{ boxShadow: pad2 ? 'inset 0 2px 6px rgba(0,255,65,0.5)' : 'inset 0 2px 4px rgba(0,0,0,0.8)' }}
                onMouseDown={() => setPad2(true)}
                onMouseUp={() => setPad2(false)}
                onMouseLeave={() => setPad2(false)}
              >
                <span className="font-mono text-[8px] text-zinc-500">A2</span>
              </button>
            </div>
          </div>

          {/* Knob */}
          <div className="flex flex-col items-center gap-1">
            <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">GAIN</span>
            <div
              className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.05)] relative flex items-center justify-center"
              style={{ transform: `rotate(calc(-140deg + 2.8deg * ${mix}))` }}
            >
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-0.5 h-2.5 bg-[#FF3300] rounded-full"></div>
            </div>
          </div>

        </div>

        <div className="mt-auto pt-6 border-t border-white/10 flex items-center gap-3 animate-bounce">
          <ArrowDown className="w-6 h-6 sm:w-8 sm:h-8 text-fuchsia-400 drop-shadow-[0_0_8px_rgba(232,121,249,0.6)]" />
          <span className="font-mono text-xs sm:text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-orange-400 uppercase tracking-wider">
            CLAIM YOUR FREE PACK &amp; REMIX PASS
          </span>
          <ArrowDown className="w-6 h-6 sm:w-8 sm:h-8 text-fuchsia-400 drop-shadow-[0_0_8px_rgba(232,121,249,0.6)]" />
        </div>
      </div>

      {/* Block B: Product Showcase (Center) */}
      <div className="col-span-1 lg:col-span-4 border-r border-zinc-800 bg-zinc-950 flex flex-col relative overflow-hidden group">
        {/* Dotted Grid BG */}
        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
        ></div>

        {/* Header */}
        <div className="p-3 border-b border-zinc-800 bg-black text-white flex justify-between items-center z-10 w-full">
          <div className="flex items-center gap-2">
            <Disc3 className="w-4 h-4 text-fuchsia-500" />
            <span className="font-mono text-sm font-bold uppercase tracking-wide">Review: PRO-1</span>
          </div>
          <span className="text-[10px] font-mono border border-white/30 px-1">CORE 01</span>
        </div>

        <div className="relative z-10 flex flex-col flex-1">
          <div className="flex-1 flex items-center justify-center py-4">
            {/* CORE_01 Record Display — 50% scale container */}
            <div className="w-1/2 relative mx-auto">
              <video
                ref={videoRef}
                src="/videos/ronin-record.mp4"
                muted
                loop
                playsInline
                className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              />
              {/* CORE_01 floating label */}
              <div className="absolute -bottom-6 left-0 right-0 flex flex-col items-center pointer-events-none">
                <span className="font-mono text-[10px] sm:text-xs font-bold tracking-tighter text-white/70 bg-black/50 px-2 py-0.5">CORE_01</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
