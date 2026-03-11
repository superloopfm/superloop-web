import { useState, useRef, useEffect } from 'react';
import { QrCode, Activity, Disc3, User, BarChart2, TrendingUp, Disc, PlayCircle, Package, Mic2, Zap, Lock, ArrowDownRight, Download } from 'lucide-react';

export default function App() {
  const [mix, setMix] = useState(0);
  const [pad1, setPad1] = useState(false);
  const [pad2, setPad2] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isPlaying) {
      vid.play();
    } else {
      vid.pause();
    }
  }, [isPlaying]);
  return (
    <body className="bg-zinc-50 text-zinc-950 font-sans antialiased overflow-x-hidden selection:bg-zinc-900 selection:text-white">

      {/* Dither/Gradient Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-100 via-zinc-200 to-zinc-300 opacity-80"></div>
        <div className="absolute inset-0 bg-noise mix-blend-overlay"></div>
      </div>

      {/* Main Grid Container — no max-w constraint, extends to ultrawide edges */}
      <main className="relative z-10 w-full min-h-screen grid grid-cols-[3rem_1fr_3rem] md:grid-cols-[14rem_1fr_4rem] border-x border-zinc-300 bg-transparent" style={{ '--mix': mix / 100, '--pad1': pad1 ? 1 : 0, '--pad2': pad2 ? 1 : 0 } as React.CSSProperties}>

        {/* LEFT MARGIN: Navigation Sidebar */}
        <aside className="relative border-r border-zinc-300 h-full hidden md:flex flex-col items-center px-2 py-8 bg-zinc-50/50 backdrop-blur-sm">
          {/* Logo */}
          <img src="/logos/superloop-bl-1.png" alt="Superloop" className="w-8 h-8 object-contain" />

          {/* Vertical line from logo to nav */}
          <div className="w-px h-16 bg-zinc-300 my-4"></div>

          {/* Nav Menu */}
          <nav className="flex flex-col items-center text-center gap-6 w-full">
            {/* Studio / Remix — Active */}
            <a
              href="#"
              className="group flex flex-col items-center gap-1 font-mono text-sm uppercase font-bold tracking-widest text-zinc-900 hover:text-[#FF3300] transition-colors"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF3300] text-xs">-&gt;</span>
              Studio / Remix
            </a>

            {/* Soundpacks — Active */}
            <a
              href="#"
              className="group flex flex-col items-center gap-1 font-mono text-sm uppercase font-bold tracking-widest text-zinc-900 hover:text-[#FF3300] transition-colors"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF3300] text-xs">-&gt;</span>
              Soundpacks
            </a>

            {/* Artist ID — Active */}
            <a
              href="#"
              className="group flex flex-col items-center gap-1 font-mono text-sm uppercase font-bold tracking-widest text-zinc-900 hover:text-[#FF3300] transition-colors"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF3300] text-xs">-&gt;</span>
              Artist ID
            </a>

            {/* Divider */}
            <div className="w-8 h-px bg-zinc-200"></div>

            {/* Leaderboard */}
            <a
              href="#"
              className="group flex flex-col items-center gap-1 font-mono text-sm uppercase font-bold tracking-widest text-zinc-900 hover:text-[#FF3300] transition-colors"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF3300] text-xs">-&gt;</span>
              Leaderboard
            </a>

            {/* Remix Trees */}
            <a
              href="#"
              className="group flex flex-col items-center gap-1 font-mono text-sm uppercase font-bold tracking-widest text-zinc-900 hover:text-[#FF3300] transition-colors"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF3300] text-xs">-&gt;</span>
              Remix Trees
            </a>
          </nav>
        </aside>

        {/* CENTER CONTENT: Swiss Grid Layout */}
        <section className="relative w-full h-full grid grid-cols-1 lg:grid-cols-12 grid-rows-[auto_auto_1fr] gap-0">

          {/* Top Navigation / Header Area */}
          <header className="col-span-1 lg:col-span-12 border-b border-zinc-300 py-1.5 px-6 flex justify-between items-center relative bg-zinc-50/80 backdrop-blur-sm">
            <div>
              <img src="/logos/superloop-text-bl-1.png" alt="Superloop.fm" className="h-6 md:h-10 object-contain" />
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
          <div className="col-span-1 lg:col-span-12 relative overflow-hidden min-h-[50vh] border-b border-zinc-300">

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
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[80%] lg:w-[60%] lg:pr-12 z-30 group px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left: Text block */}
                <div className="lg:col-span-7">
                  <div className="flex items-baseline gap-4 mb-4">
                    <div className="bg-[#FF5F00] text-black font-mono text-xs font-bold px-3 py-1 uppercase rotate-1 select-none">
                      Current Reign
                    </div>
                  </div>

                  <h2 className="text-[12vw] lg:text-[7vw] leading-[0.85] font-black text-white tracking-tighter mix-blend-difference mb-6 cursor-pointer hover:text-[#00FF41] transition-colors">
                    SYNTHETIC<br />DREAMS
                  </h2>

                  <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-white/60 bg-black/70 backdrop-blur-md p-4 border-l-2 border-[#00FF41]">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#00FF41]" />
                      <span className="text-white">ARTIST:</span> NEON_VIOLET
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart2 className="w-4 h-4 text-[#00FF41]" />
                      <span className="text-white">STREAMS:</span> 4,291,002
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#00FF41]" />
                      <span className="text-[#00FF41]">+142%</span> VELOCITY
                    </div>
                  </div>
                </div>

                {/* Right: 3D tilt card — massive */}
                <div className="lg:col-span-5">
                  <div className="relative bg-[#0a0a0a] border border-white/20 p-3 transition-transform duration-700 [transform:rotateY(12deg)] hover:[transform:rotateY(0deg)] shadow-[0_0_80px_rgba(0,255,65,0.2)] group-hover:border-[#00FF41]">
                    <img
                      src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop"
                      className="w-full aspect-square object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                      alt="Synthetic Dreams cover"
                    />
                    <div className="absolute top-6 right-6 animate-[spin_20s_linear_infinite]">
                      <Disc className="w-14 h-14 text-white opacity-50" />
                    </div>
                    <div className="mt-3 flex justify-between items-center px-3">
                      <div className="h-1.5 w-32 bg-white/10 overflow-hidden">
                        <div className="h-full bg-[#00FF41] w-[80%] animate-pulse"></div>
                      </div>
                      <PlayCircle className="w-8 h-8 text-white hover:text-[#00FF41] cursor-pointer transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
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

            {/* Block A: Remix Week (Left) — bleeds into left margin */}
            <div className="col-span-1 lg:col-span-5 border-r border-zinc-300 -ml-[3rem] md:-ml-[14rem] pl-[3rem] md:pl-[14rem] pr-6 py-6 flex flex-col justify-between bg-[#050505] text-white overflow-hidden">
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
              <div className="flex items-center gap-4 mt-4">

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

              <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">Remix Section Below</span>
                <ArrowDownRight className="w-5 h-5 text-[#FF3300]" />
              </div>
            </div>

            {/* Block B: Product Showcase (Center-Right) */}
            <div className="col-span-1 lg:col-span-3 border-r border-zinc-300 p-6 relative overflow-hidden group">
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
                </div>

                <div className="flex-1 flex items-center justify-center py-4">
                  {/* CORE_01 Record Display — full-bleed, unconstrained */}
                  <div className="w-full relative">
                    <video
                      ref={videoRef}
                      src="/videos/ronin-record.mp4"
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-contain"
                    />
                    {/* CORE_01 floating label */}
                    <div className="absolute bottom-2 left-0 right-0 flex flex-col items-center pointer-events-none">
                      <span className="font-mono text-xs font-bold tracking-tighter text-white/70 bg-black/50 px-2 py-0.5">CORE_01</span>
                    </div>
                    {/* Annotation */}
                    <div className="absolute -right-2 -top-2 w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-mono border-2 border-white">
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

            {/* Block C: Supply Depot */}
            <div className="col-span-1 lg:col-span-4 flex flex-col bg-zinc-100 overflow-y-auto">
              {/* Header */}
              <div className="p-3 border-b border-black bg-black text-white flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  <span className="font-mono text-sm font-bold uppercase tracking-wide">Supply_Depot</span>
                </div>
                <span className="text-[10px] font-mono border border-white/30 px-1">V.4.0</span>
              </div>

              {/* Vending Slots */}
              <div className="flex flex-col p-3 gap-2 flex-1">
                {/* Pack 1 */}
                <button className="group w-full text-left bg-white border-2 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-[#00FF41] hover:border-black transition-all" onClick={() => setIsPlaying(p => !p)}>
                  <div className="flex justify-between items-start mb-1">
                    <span className="bg-black text-white text-[9px] px-1 font-mono">A-01</span>
                    <Disc className="w-4 h-4 group-hover:animate-spin" />
                  </div>
                  <h3 className="font-bold text-sm leading-tight uppercase mb-1">Acid_Washed_Breakbeats</h3>
                  <div className="flex justify-between items-end border-t border-dashed border-black pt-1 mt-1">
                    <span className="text-[9px] font-mono text-zinc-500">170BPM / DISTORTED</span>
                    <span className="font-bold text-xs group-hover:text-orange-600">DOWNLOAD</span>
                  </div>
                </button>

                {/* Pack 2 */}
                <button className="group w-full text-left bg-white border-2 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-[#00FF41] hover:border-black transition-all" onClick={() => setIsPlaying(p => !p)}>
                  <div className="flex justify-between items-start mb-1">
                    <span className="bg-black text-white text-[9px] px-1 font-mono">A-02</span>
                    <Mic2 className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm leading-tight uppercase mb-1">Vocal_Chops_Glitch</h3>
                  <div className="flex justify-between items-end border-t border-dashed border-black pt-1 mt-1">
                    <span className="text-[9px] font-mono text-zinc-500">STUTTER FX</span>
                    <span className="font-bold text-xs group-hover:text-orange-600">DOWNLOAD</span>
                  </div>
                </button>

                {/* Pack 3 */}
                <button className="group w-full text-left bg-white border-2 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-[#00FF41] hover:border-black transition-all" onClick={() => setIsPlaying(p => !p)}>
                  <div className="flex justify-between items-start mb-1">
                    <span className="bg-black text-white text-[9px] px-1 font-mono">B-01</span>
                    <Zap className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm leading-tight uppercase mb-1">Industrial_Kicks</h3>
                  <div className="flex justify-between items-end border-t border-dashed border-black pt-1 mt-1">
                    <span className="text-[9px] font-mono text-zinc-500">HARD CLIPPING</span>
                    <span className="font-bold text-xs group-hover:text-orange-600">DOWNLOAD</span>
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
                    <span className="text-[9px] font-mono text-zinc-500">LOCKED UNTIL 12AM</span>
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

          </div>

        </section>

        {/* REMIX NOW: Full-width dark editorial block */}
        <div className="col-span-full bg-neutral-950 border-t-2 border-[#FF3300] py-8 px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* COL 2: Glitch Image */}
            <div className="lg:col-span-5 flex flex-col gap-0">
              <div className="relative aspect-[3/4] border border-white/20 bg-[#111] overflow-hidden">
                <img
                  src="/images/sunset-vending.png"
                  alt="Sunset Vending Machine"
                  className="w-full h-full object-contain max-h-[32rem] object-bottom grayscale mix-blend-luminosity opacity-80"
                />
                {/* Grid overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                  }}
                ></div>
                {/* Dashed inner border */}
                <div className="absolute inset-4 border border-dashed border-white/20 pointer-events-none"></div>
              </div>
            </div>

            {/* COL 3: Remix Now header + specs + vending buttons */}
            <div className="lg:col-span-7 flex flex-col gap-6">

              {/* Remix Now header + "Break The Loop" box side by side */}
              <div className="border-l-2 border-[#FF3300] pl-4">
                <div className="flex items-start gap-6 mb-4">
                  <h2 className="text-6xl font-black uppercase tracking-tighter text-white leading-none">
                    Remix<br />Now
                  </h2>
                  {/* "Break The Loop" orange callout — lifted up next to the title */}
                  <div className="bg-[#FF3300] text-black p-4 shadow-[8px_8px_0px_white] flex-shrink-0">
                    <div className="font-mono text-[9px] uppercase tracking-widest mb-1 opacity-70">SP SOUNDPACK</div>
                    <h3 className="font-black text-2xl uppercase leading-none tracking-tighter">Break<br />The Loop</h3>
                    <div className="font-mono text-[9px] mt-2 uppercase tracking-widest">VOL.1 // REMIX EDITION</div>
                  </div>
                </div>
                <div className="font-mono text-[9px] text-neutral-400 grid grid-cols-2 gap-4 max-w-sm">
                  <p>01 // DOWNLOAD STEMS<br />Format: WAV 24bit<br />Size: 2.4GB</p>
                  <p>02 // SUBMIT TRACK<br />Deadline: 14.10.24<br />BPM: 128-140</p>
                  <p>03 // WIN HARDWARE<br />Prize: Analog Heat<br />+2yr Subscription</p>
                  <p>04 // JUDGING<br />By: Dave Clarke<br />Criteria: Innovation</p>
                </div>
              </div>

              {/* Available Packs vending list */}
              <div className="flex flex-col">
                <div className="flex justify-between items-end mb-3 border-b border-white/20 pb-1">
                  <span className="font-mono text-[10px] text-[#FF3300] uppercase tracking-widest">Available_Packs</span>
                  <span className="font-mono text-[10px] text-neutral-500">Credits: ∞</span>
                </div>

                <div className="space-y-3">
                  {/* Pack A1 */}
                  <button className="vending-btn w-full bg-neutral-900 border-2 border-neutral-800 p-4 rounded-none flex items-center justify-between group text-left shadow-[3px_3px_0px_white] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none hover:border-[#FF3300] transition-all">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xl font-bold text-[#FF3300] group-hover:text-white transition-colors">A1</span>
                      <div>
                        <div className="font-bold text-sm uppercase tracking-tight text-white">Acid_Texture_Pack</div>
                        <div className="font-mono text-[9px] text-neutral-500">303_WAVEFORMS // DISTORTION</div>
                      </div>
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center border border-neutral-700 bg-black group-hover:bg-[#FF3300] group-hover:text-black transition-colors">
                      <Download className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Pack B2 */}
                  <button className="vending-btn w-full bg-neutral-900 border-2 border-neutral-800 p-4 rounded-none flex items-center justify-between group text-left shadow-[3px_3px_0px_white] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none hover:border-[#FF3300] transition-all">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xl font-bold text-[#FF3300] group-hover:text-white transition-colors">B2</span>
                      <div>
                        <div className="font-bold text-sm uppercase tracking-tight text-white">Industrial_Kicks</div>
                        <div className="font-mono text-[9px] text-neutral-500">HEAVY_IMPACT // LOW_END</div>
                      </div>
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center border border-neutral-700 bg-black group-hover:bg-[#FF3300] group-hover:text-black transition-colors">
                      <Download className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Pack C3 */}
                  <button className="vending-btn w-full bg-neutral-900 border-2 border-neutral-800 p-4 rounded-none flex items-center justify-between group text-left shadow-[3px_3px_0px_white] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none hover:border-[#FF3300] transition-all">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xl font-bold text-[#FF3300] group-hover:text-white transition-colors">C3</span>
                      <div>
                        <div className="font-bold text-sm uppercase tracking-tight text-white">Glitch_Vocals</div>
                        <div className="font-mono text-[9px] text-neutral-500">CHOPPED // GRANULAR</div>
                      </div>
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center border border-neutral-700 bg-black group-hover:bg-[#FF3300] group-hover:text-black transition-colors">
                      <Download className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Pack D4 — locked */}
                  <button className="vending-btn w-full bg-neutral-900 border border-neutral-800 p-4 flex items-center justify-between text-left opacity-50 cursor-not-allowed">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xl font-bold text-neutral-600">D4</span>
                      <div>
                        <div className="font-bold text-sm uppercase tracking-tight text-neutral-500">Secret_Weapon</div>
                        <div className="font-mono text-[9px] text-neutral-600">LOCKED_UNTIL_SUBMISSION</div>
                      </div>
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center border border-neutral-800 bg-neutral-900 text-neutral-700">
                      <Lock className="w-4 h-4" />
                    </div>
                  </button>
                </div>

                <div className="mt-6 pt-4 border-t border-dashed border-neutral-800 flex justify-between font-mono text-[9px] text-neutral-500">
                  <span>SYS.ID: 884-21X</span>
                  <span>STATUS: ONLINE</span>
                </div>
              </div>

            </div>

          </div>
        </div>

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
