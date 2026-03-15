import { useRef, useEffect } from 'react';
import { Disc3 } from 'lucide-react';

export default function Soundpacks() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header Bar */}
      <div className="border-b border-zinc-800 px-6 py-4 flex items-center gap-3">
        <img src="/logos/superloop-text-bl-1.png" alt="Superloop.fm" className="h-5 md:h-8 object-contain invert" />
        <div className="ml-auto font-mono text-[10px] uppercase tracking-widest text-zinc-500">Soundpack Archive</div>
      </div>

      {/* Product Showcase — extracted from RemixFader Block B */}
      <div className="max-w-4xl mx-auto mt-12 px-4">
        <div className="bg-zinc-950 border border-zinc-800 relative overflow-hidden">
          {/* Dotted Grid BG */}
          <div
            className="absolute inset-0"
            style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
          ></div>

          {/* Header */}
          <div className="p-3 border-b border-zinc-800 bg-black text-white flex justify-between items-center z-10 w-full relative">
            <div className="flex items-center gap-2">
              <Disc3 className="w-4 h-4 text-fuchsia-500" />
              <span className="font-mono text-sm font-bold uppercase tracking-wide">Review: PRO-1</span>
            </div>
            <span className="text-[10px] font-mono border border-white/30 px-1">CORE 01</span>
          </div>

          <div className="relative z-10 flex flex-col">
            <div className="flex items-center justify-center py-12">
              {/* CORE_01 Record Display */}
              <div className="w-1/3 relative mx-auto">
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
      </div>
    </div>
  );
}
