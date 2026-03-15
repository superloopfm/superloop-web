import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Placeholder() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const id = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* CRT scanline overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.15)_2px,rgba(0,0,0,0.15)_4px)]"></div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: 'radial-gradient(rgba(255,51,0,0.3) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      ></div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        <div className="font-mono text-[#FF3300] text-xs sm:text-sm tracking-[0.4em] uppercase mb-8 animate-[flicker_3s_ease-in-out_infinite]">
          SUPERLOOP // SYSTEM_TERMINAL
        </div>

        <div className="font-mono text-[#FF3300] text-lg sm:text-2xl md:text-3xl tracking-widest uppercase leading-relaxed select-none">
          <span className="animate-[textScan_4s_ease-in-out_infinite]">
            [ DECRYPTING DATA{dots} ]
          </span>
          <br />
          <span className="animate-[textScan_4s_ease-in-out_infinite_0.5s]">
            [ ESTABLISHING UPLINK{dots} ]
          </span>
        </div>

        <div className="mt-12 font-mono text-zinc-600 text-[10px] tracking-widest uppercase">
          Module loading — stand by
        </div>

        <Link
          to="/"
          className="mt-8 inline-block font-mono text-xs uppercase tracking-wider text-zinc-500 border border-zinc-800 px-4 py-2 hover:text-[#FF3300] hover:border-[#FF3300] transition-colors"
        >
          &larr; Return to Studio
        </Link>
      </div>
    </div>
  );
}
