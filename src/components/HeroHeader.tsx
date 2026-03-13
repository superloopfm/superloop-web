import { QrCode } from 'lucide-react';

interface HeroHeaderProps {
  isSyntheticLit: boolean;
  setIsSyntheticLit: (value: boolean) => void;
}

export default function HeroHeader({ isSyntheticLit, setIsSyntheticLit }: HeroHeaderProps) {
  return (
    <>
      {/* Top Navigation / Header Area */}
      <header className="col-span-1 lg:col-span-12 border-b border-zinc-300 py-3 px-4 sm:px-6 flex justify-between items-center relative bg-zinc-50/80 backdrop-blur-sm">
        <div>
          <img src="/logos/superloop-text-bl-1.png" alt="Superloop.fm" className="h-5 md:h-8 object-contain" />
        </div>

        {/* Top Right Badge */}
        <div className="hidden md:flex gap-6 items-center">
          <div className="text-right">
            <div className="text-xs font-mono text-zinc-400 uppercase">Issue Date</div>
            <div className="text-sm font-semibold tracking-tight">OCT 2024</div>
          </div>
          <div className="w-px h-8 bg-zinc-300"></div>
          <div className="border border-zinc-900 p-1">
            <QrCode className="w-8 h-8" />
          </div>
        </div>
      </header>

      {/* ROW 1: Massive Title & Sub-grid */}
      <div className="col-span-1 lg:col-span-12 relative overflow-hidden min-h-[40vh] sm:min-h-[50vh] border-b border-zinc-300">

        {/* Left-Side Background Video */}
        <div className="absolute left-0 top-0 w-full sm:w-[65%] h-full overflow-hidden pointer-events-none z-0">
          <video
            src="/videos/hero-bg.mp4"
            muted
            loop
            autoPlay
            playsInline
            className="w-full h-full object-cover opacity-40"
          />
          {/* Grid / Dot Filter Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
          {/* Right edge fade-out gradient */}
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-50 to-transparent"></div>
        </div>

        {/* Background Wireframe Render */}
        <div className="absolute -right-20 top-0 w-3/4 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" transform="rotate(-15) scale(1.5)" />
          </svg>
        </div>

        {/* #1 TRACK: SYNTHETIC DREAMS — upscaled centerpiece */}
        <div className="absolute inset-0 sm:left-auto sm:right-0 sm:top-1/2 sm:-translate-y-1/2 w-full sm:w-[80%] lg:w-[60%] lg:pr-12 z-30 group px-4 sm:px-6 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center w-full">
            {/* Left: Text block */}
            <div className="lg:col-span-7">
              <div className="flex items-baseline gap-4 mb-4">
                <div className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-orange-500 text-white font-mono text-xs font-bold px-3 py-1 uppercase rotate-1 select-none">
                  Current Reign
                </div>
              </div>

              <h2 className={`text-[11vw] sm:text-[12vw] lg:text-[7vw] leading-[0.85] font-black tracking-tighter mb-4 sm:mb-6 transition-all duration-300 ${isSyntheticLit ? 'text-fuchsia-400 drop-shadow-[0_0_30px_rgba(232,121,249,0.9)]' : 'text-zinc-950'}`}>
                SYNTHETIC<br />DREAMS
              </h2>

              <div className="mt-6 sm:mt-12 flex flex-col items-start gap-1 font-mono text-xs sm:text-sm tracking-widest uppercase">
                <span className="bg-zinc-900 text-white font-bold px-3 py-1.5 leading-none">Only 100 Pressed.</span>
                <span className="bg-zinc-900 text-zinc-300 px-3 py-1.5 leading-none text-[10px] sm:text-sm">Only 1 can be yours. Remix Week Pass Included.</span>
              </div>
            </div>

            {/* Right: 3D tilt card — massive */}
            <div className="lg:col-span-5 hidden sm:block">
              <div
                className="relative cursor-pointer transition-transform hover:-translate-y-1 duration-300"
                onClick={() => setIsSyntheticLit(!isSyntheticLit)}
              >
                <div className="aspect-square w-full relative rounded-2xl overflow-hidden shadow-2xl">
                  <img src="/images/dreamwarden-record.jpg" className="absolute inset-0 w-full h-full object-contain z-10 brightness-75 hover:brightness-110 transition-all duration-300" alt="Record" />
                  <img src="/images/dreamwarden-spine.png" className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none" alt="Spine Overlay" />
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </>
  );
}
