import { useRef, useCallback } from 'react';
import { Package, Disc, Mic2, Zap, Lock } from 'lucide-react';
import { animate } from 'animejs';

/** Tiny 4-bar audio level meter — CSS-only looping animation */
function AudioBars() {
  return (
    <div className="flex items-end gap-[2px] h-[10px]">
      {[0, 1, 2, 3].map(i => (
        <span
          key={i}
          className="w-[2px] bg-fuchsia-600 rounded-sm animate-[eqBounce_0.8s_ease-in-out_infinite]"
          style={{ animationDelay: `${i * 0.15}s`, height: '60%' }}
        />
      ))}
    </div>
  );
}

interface SoundpackDepotProps {
  playingTab: string | null;
  setPlayingTab: (value: string | null) => void;
  countdown: string;
}

export default function SoundpackDepot({ playingTab, setPlayingTab, countdown }: SoundpackDepotProps) {
  const soundpackRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleSoundpackEnter = useCallback((el: HTMLButtonElement | null) => {
    if (!el) return;
    animate(el, {
      boxShadow: ['3px 3px 0px 0px rgba(0,0,0,1)', '5px 5px 0px 0px rgba(192,38,211,1)'],
      duration: 200,
      ease: 'outCubic',
    });
    const title = el.querySelector('.sp-title') as HTMLElement | null;
    if (title) {
      animate(title, { color: ['rgb(0,0,0)', 'rgb(192,38,211)'], duration: 200, ease: 'outCubic' });
    }
  }, []);

  const handleSoundpackLeave = useCallback((el: HTMLButtonElement | null) => {
    if (!el) return;
    animate(el, {
      boxShadow: ['5px 5px 0px 0px rgba(192,38,211,1)', '3px 3px 0px 0px rgba(0,0,0,1)'],
      duration: 150,
      ease: 'outQuad',
    });
    const title = el.querySelector('.sp-title') as HTMLElement | null;
    if (title) {
      animate(title, { color: ['rgb(192,38,211)', 'rgb(0,0,0)'], duration: 150, ease: 'outQuad' });
    }
  }, []);

  return (
    <div className="col-span-1 lg:col-span-3 flex flex-col bg-zinc-100 overflow-y-auto">
      {/* Header */}
      <div className="p-3 border-b border-black bg-black text-white flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4" />
          <span className="font-mono text-sm font-bold uppercase tracking-wide">Soundpack_Content</span>
        </div>
        <span className="text-[10px] font-mono border border-white/30 px-1">V.4.0</span>
      </div>

      {/* Vending Slots */}
      <div className="flex flex-col p-3 gap-2 flex-1">
        {/* Pack 1 */}
        <button
          ref={el => { soundpackRefs.current[0] = el; }}
          className="group w-full text-left bg-white border-2 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[3px] active:shadow-none transition-all"
          onClick={() => setPlayingTab(playingTab === 'A-01' ? null : 'A-01')}
          onMouseEnter={() => handleSoundpackEnter(soundpackRefs.current[0])}
          onMouseLeave={() => handleSoundpackLeave(soundpackRefs.current[0])}
        >
          <div className="flex justify-between items-start mb-1">
            <span className="bg-black text-white text-[9px] px-1 font-mono">A-01</span>
            <div className="flex items-center gap-1.5">
              {playingTab === 'A-01' && <AudioBars />}
              <Disc className={`w-4 h-4 ${playingTab === 'A-01' ? 'animate-spin' : 'group-hover:animate-spin'}`} />
            </div>
          </div>
          <h3 className="sp-title font-bold text-sm leading-tight uppercase mb-1">Acid_Washed_Breakbeats</h3>
          <div className="flex justify-between items-end border-t border-dashed border-black pt-1 mt-1">
            <span className="text-[9px] font-mono text-zinc-500">170BPM / DISTORTED</span>
            <span className="font-bold text-xs group-hover:text-fuchsia-600 transition-colors">DOWNLOAD</span>
          </div>
        </button>

        {/* Pack 2 */}
        <button
          ref={el => { soundpackRefs.current[1] = el; }}
          className="group w-full text-left bg-white border-2 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[3px] active:shadow-none transition-all"
          onClick={() => setPlayingTab(playingTab === 'A-02' ? null : 'A-02')}
          onMouseEnter={() => handleSoundpackEnter(soundpackRefs.current[1])}
          onMouseLeave={() => handleSoundpackLeave(soundpackRefs.current[1])}
        >
          <div className="flex justify-between items-start mb-1">
            <span className="bg-black text-white text-[9px] px-1 font-mono">A-02</span>
            <div className="flex items-center gap-1.5">
              {playingTab === 'A-02' && <AudioBars />}
              <Mic2 className="w-4 h-4" />
            </div>
          </div>
          <h3 className="sp-title font-bold text-sm leading-tight uppercase mb-1">Vocal_Chops_Glitch</h3>
          <div className="flex justify-between items-end border-t border-dashed border-black pt-1 mt-1">
            <span className="text-[9px] font-mono text-zinc-500">STUTTER FX</span>
            <span className="font-bold text-xs group-hover:text-fuchsia-600 transition-colors">DOWNLOAD</span>
          </div>
        </button>

        {/* Pack 3 */}
        <button
          ref={el => { soundpackRefs.current[2] = el; }}
          className="group w-full text-left bg-white border-2 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[3px] active:shadow-none transition-all"
          onClick={() => setPlayingTab(playingTab === 'B-01' ? null : 'B-01')}
          onMouseEnter={() => handleSoundpackEnter(soundpackRefs.current[2])}
          onMouseLeave={() => handleSoundpackLeave(soundpackRefs.current[2])}
        >
          <div className="flex justify-between items-start mb-1">
            <span className="bg-black text-white text-[9px] px-1 font-mono">B-01</span>
            <div className="flex items-center gap-1.5">
              {playingTab === 'B-01' && <AudioBars />}
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <h3 className="sp-title font-bold text-sm leading-tight uppercase mb-1">Industrial_Kicks</h3>
          <div className="flex justify-between items-end border-t border-dashed border-black pt-1 mt-1">
            <span className="text-[9px] font-mono text-zinc-500">HARD CLIPPING</span>
            <span className="font-bold text-xs group-hover:text-fuchsia-600 transition-colors">DOWNLOAD</span>
          </div>
        </button>

        {/* Pack 4 — locked */}
        <button className="group w-full text-left bg-zinc-200 border-2 border-zinc-400 p-3 opacity-70 cursor-not-allowed">
          <div className="flex justify-between items-start mb-1">
            <span className="bg-zinc-400 text-white text-[9px] px-1 font-mono">C-09</span>
            <Lock className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-sm leading-tight uppercase mb-1 text-zinc-500">Secret_Stems_v2</h3>
          <div className="flex justify-between items-end border-t border-dashed border-zinc-400 pt-1 mt-1">
            <span className="text-[9px] font-mono text-zinc-500">LOCKED UNTIL {countdown}</span>
            <span className="font-bold text-xs text-zinc-500">LOCKED</span>
          </div>
        </button>
      </div>

      {/* Bottom Ad */}
      <div className="p-4 bg-orange-600 text-black mt-auto">
        <h4 className="font-mono font-black text-xl uppercase mb-1">Join The Noise</h4>
        <p className="text-[10px] font-mono mb-3 border-b border-black pb-2">Submit your remix before the timer hits zero.</p>
        <button className="w-full bg-black text-white py-2 font-mono font-bold text-xs uppercase hover:bg-white hover:text-black transition-colors border-2 border-black">
          Upload Track
        </button>
      </div>
    </div>
  );
}
