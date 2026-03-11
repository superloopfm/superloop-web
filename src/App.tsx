import { Aperture, QrCode, Activity, FileText, ArrowRight, Star, Cpu, ArrowUpRight, Disc3 } from 'lucide-react';

export default function App() {
  return (
    <body className="bg-zinc-50 text-zinc-950 font-sans antialiased overflow-x-hidden selection:bg-zinc-900 selection:text-white">

      {/* Dither/Gradient Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-100 via-zinc-200 to-zinc-300 opacity-80"></div>
        <div className="absolute inset-0 bg-noise mix-blend-overlay"></div>
      </div>

      {/* Main Grid Container — no max-w constraint, extends to ultrawide edges */}
      <main className="relative z-10 w-full min-h-screen grid grid-cols-[3rem_1fr_3rem] md:grid-cols-[4rem_1fr_4rem] border-x border-zinc-300 bg-transparent">

        {/* LEFT MARGIN: Running Header */}
        <aside className="relative border-r border-zinc-300 h-full hidden md:flex flex-col items-center justify-between py-12 bg-zinc-50/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-6">
            <Aperture className="w-6 h-6 text-zinc-900" />
            <div className="h-24 w-px bg-zinc-300"></div>
          </div>
          <div className="rotate-180 [writing-mode:vertical-rl] text-xs font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-4">
            <span>Vol. 84</span>
            <span className="text-zinc-900 font-semibold">Audio Engineering Quarterly</span>
            <span>Serial No. 2049-X</span>
          </div>
          <div className="flex flex-col items-center gap-6">
            <div className="h-24 w-px bg-zinc-300"></div>
            <span className="text-xs font-mono">01</span>
          </div>
        </aside>

        {/* CENTER CONTENT: Swiss Grid Layout */}
        <section className="relative w-full h-full grid grid-cols-1 lg:grid-cols-12 grid-rows-[auto_auto_1fr] gap-0">

          {/* Top Navigation / Header Area */}
          <header className="col-span-1 lg:col-span-12 border-b border-zinc-300 p-6 flex justify-between items-start relative bg-zinc-50/80 backdrop-blur-sm">
            <div className="flex flex-col gap-1">
              <h1 className="font-mono text-4xl md:text-6xl tracking-tighter leading-none uppercase text-zinc-900">
                Signal<span className="text-zinc-400">/</span>Flow
              </h1>
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mt-2 max-w-[20rem]">
                The definitive guide to modular synthesis and analog waveform generation.
              </p>
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
          <div className="col-span-1 lg:col-span-12 relative overflow-hidden min-h-[60vh] border-b border-zinc-300">

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

            {/* Technical Image */}
            <div className="absolute inset-0 z-0 flex items-center justify-center lg:justify-end lg:pr-24 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop"
                alt="Modular Synth"
                className="h-[120%] w-auto object-cover grayscale contrast-[1.25] brightness-90 mix-blend-multiply opacity-90 transform rotate-3 translate-x-12"
              />

              {/* SVG Annotation Lines */}
              <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none">
                <line x1="60%" y1="40%" x2="75%" y2="25%" stroke="black" strokeWidth="1" />
                <circle cx="60%" cy="40%" r="4" fill="white" stroke="black" strokeWidth="2" />
                <text x="76%" y="24%" className="text-[10px] font-mono fill-zinc-900 uppercase">Oscillator Bank A</text>
                <line x1="45%" y1="60%" x2="30%" y2="75%" stroke="black" strokeWidth="1" />
                <circle cx="45%" cy="60%" r="4" fill="white" stroke="black" strokeWidth="2" />
              </svg>
            </div>

            {/* OVERSIZED TYPOGRAPHY LAYER */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 lg:px-12 pointer-events-none">
              <h2 className="text-[15vw] leading-[0.8] font-mono font-semibold tracking-tighter text-zinc-900 mix-blend-hard-light opacity-90">
                MODU
              </h2>
              <h2 className="text-[15vw] leading-[0.8] font-mono font-semibold tracking-tighter text-zinc-900 mix-blend-hard-light pl-[10vw] -mt-[2vw]">
                LAR_
              </h2>
            </div>

            {/* Vellum Overlay Box 1 (Floating Data) */}
            <div className="absolute bottom-12 left-6 lg:left-12 w-64 bg-white/60 backdrop-blur-md border border-zinc-200 p-4 z-30 shadow-sm">
              <div className="flex justify-between items-center border-b border-zinc-300 pb-2 mb-2">
                <span className="text-xs font-mono uppercase text-zinc-500">Frequency Response</span>
                <Activity className="w-4 h-4 text-zinc-900" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">Low Pass</span>
                  <span className="font-mono">20Hz - 20kHz</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">Resonance</span>
                  <span className="font-mono text-zinc-900">+12dB</span>
                </div>
                <div className="w-full bg-zinc-200 h-px my-2"></div>
                <p className="text-[10px] leading-tight text-zinc-600">
                  Measured output from the master bus showing typical analog saturation characteristics.
                </p>
              </div>
            </div>

          </div>

          {/* ROW 2: Asymmetrical Content Blocks */}
          <div className="col-span-1 lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 min-h-[40vh]">

            {/* Block A: Text Heavy (Left) */}
            <div className="col-span-1 lg:col-span-4 border-r border-zinc-300 p-6 lg:p-8 flex flex-col justify-between bg-zinc-50">
              <div>
                <span className="inline-block px-2 py-1 bg-zinc-900 text-zinc-50 text-xs font-mono uppercase mb-4">Feature</span>
                <h3 className="text-3xl lg:text-4xl font-semibold tracking-tight leading-none mb-6">
                  The Evolution of Voltage Control
                </h3>
                <p className="text-lg text-zinc-600 leading-snug mb-6">
                  Behind the scenes of the seminal Eurorack revolution and its impact on modern sound design.
                </p>
              </div>

              <div className="mt-auto pt-8 border-t border-zinc-200">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-zinc-500 mb-2">
                  <FileText className="w-3 h-3" />
                  <span>Read time: 12 min</span>
                </div>
                <a href="#" className="group flex items-center justify-between w-full py-2 border-b border-zinc-900">
                  <span className="font-mono text-sm group-hover:pl-2 transition-all">Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Block B: Product Showcase (Center-Right) */}
            <div className="col-span-1 lg:col-span-5 border-r border-zinc-300 p-6 relative overflow-hidden group">
              {/* Dotted Grid BG */}
              <div
                className="absolute inset-0"
                style={{ backgroundImage: 'radial-gradient(#d4d4d8 1px, transparent 1px)', backgroundSize: '20px 20px' }}
              ></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start">
                  <div className="bg-white border border-zinc-200 px-3 py-1 shadow-sm">
                    <span className="text-xs font-mono font-semibold">REVIEW: PRO-1</span>
                  </div>
                  <Star className="w-5 h-5 fill-zinc-900 text-zinc-900" />
                </div>

                <div className="flex-1 flex items-center justify-center py-8">
                  {/* Abstract Hardware Box */}
                  <div className="w-48 h-48 border border-zinc-900 bg-zinc-100 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] flex items-center justify-center relative">
                    <Cpu className="w-20 h-20 text-zinc-300 stroke-[0.5]" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-mono text-2xl font-bold tracking-tighter">CORE_01</span>
                      <span className="text-[10px] font-mono uppercase mt-1">Processor Unit</span>
                    </div>
                    {/* Annotation */}
                    <div className="absolute -right-4 -top-4 w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-mono border-2 border-white">
                      A+
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur border border-zinc-200 p-4">
                  <h4 className="text-sm font-semibold uppercase tracking-tight mb-1">Hands-On Verdict</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    "A masterclass in subtractive synthesis. The new filter topology creates harmonics previously impossible in this form factor."
                  </p>
                </div>
              </div>
            </div>

            {/* Block C: List / Index (Right) */}
            <div className="col-span-1 lg:col-span-3 p-0 flex flex-col bg-zinc-900 text-zinc-100">
              <div className="p-4 border-b border-zinc-800">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">In This Issue</span>
              </div>
              <ul className="flex-1 overflow-hidden">
                <li className="group border-b border-zinc-800 p-4 hover:bg-zinc-800 transition-colors cursor-pointer flex items-baseline gap-3">
                  <span className="font-mono text-xs text-zinc-500">01</span>
                  <div>
                    <h5 className="font-semibold text-sm leading-tight group-hover:underline decoration-zinc-500 underline-offset-4">Collecting Atari</h5>
                    <p className="text-[10px] text-zinc-400 mt-1 uppercase">Ten Key Games</p>
                  </div>
                </li>
                <li className="group border-b border-zinc-800 p-4 hover:bg-zinc-800 transition-colors cursor-pointer flex items-baseline gap-3">
                  <span className="font-mono text-xs text-zinc-500">02</span>
                  <div>
                    <h5 className="font-semibold text-sm leading-tight group-hover:underline decoration-zinc-500 underline-offset-4">Shadow of the Beast</h5>
                    <p className="text-[10px] text-zinc-400 mt-1 uppercase">Retrospective</p>
                  </div>
                </li>
                <li className="group border-b border-zinc-800 p-4 hover:bg-zinc-800 transition-colors cursor-pointer flex items-baseline gap-3">
                  <span className="font-mono text-xs text-zinc-500">03</span>
                  <div>
                    <h5 className="font-semibold text-sm leading-tight group-hover:underline decoration-zinc-500 underline-offset-4">Turrican II</h5>
                    <p className="text-[10px] text-zinc-400 mt-1 uppercase">Soundtrack Analysis</p>
                  </div>
                </li>
              </ul>
              <div className="p-4 mt-auto">
                <button className="w-full py-3 bg-zinc-100 text-zinc-900 font-mono text-xs uppercase font-semibold hover:bg-white transition-colors flex items-center justify-center gap-2">
                  <span>Subscribe</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>

        </section>

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

        {/* Floating Annotation (Overlapping Layout) */}
        <div className="absolute top-[25%] right-[10%] hidden lg:block z-40 pointer-events-none">
          <div className="relative">
            <svg width="100" height="100" className="overflow-visible">
              <path d="M 0 0 L -40 40 L -100 40" fill="none" stroke="black" strokeWidth="1" />
              <circle cx="0" cy="0" r="3" fill="black" />
            </svg>
            <div className="absolute top-[35px] right-[110px] bg-zinc-900 text-white text-[10px] font-mono px-2 py-1 whitespace-nowrap">
              Figure 1.2: Patch Bay
            </div>
          </div>
        </div>

      </main>

    </body>
  );
}
