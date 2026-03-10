import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

export default function App() {
  const [analyzerBars, setAnalyzerBars] = useState<number[]>(Array(10).fill(50));

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalyzerBars(prev => prev.map(() => Math.floor(Math.random() * 80) + 10));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-loop-black text-white relative selection:bg-loop-orange selection:text-black overflow-x-hidden font-sans">
      {/* Global Overlays */}
      <div className="crt-grain"></div>
      <div className="fixed inset-0 phosphor-grid z-0"></div>

      {/* Top Nav */}
      <nav className="fixed top-0 left-0 w-full h-14 border-b border-white/10 flex items-center justify-between px-6 z-50 bg-black/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-loop-orange animate-pulse"></div>
          <span className="font-mono text-xs uppercase tracking-widest text-white/70">System_Online</span>
        </div>
        <div className="hidden md:flex gap-6 font-mono text-xs uppercase">
          <a href="#" className="hover:text-loop-orange transition-colors">Manifesto</a>
          <a href="#" className="hover:text-loop-orange transition-colors">Index</a>
          <a href="#" className="hover:text-loop-orange transition-colors">Login</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-[90vh] flex flex-col md:flex-row pt-14 border-b border-white/10">

        {/* Left Visual Area */}
        <div className="w-full md:w-2/3 relative border-r border-white/10 overflow-hidden group min-h-[60vh]">
          {/* Background Image Setup */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-150 brightness-75 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
            {/* The Coin */}
            <motion.div
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 1, type: "spring" }}
              className="w-24 h-24 rounded-full coin-shine flex flex-col items-center justify-center relative cursor-help transform hover:rotate-12 transition-transform duration-500 shadow-2xl"
            >
              <div className="absolute inset-0 rounded-full border border-black/20"></div>
              <div className="font-sans font-black text-black text-xs leading-none">ISSUE</div>
              <div className="font-sans font-black text-black text-2xl leading-none">01</div>
            </motion.div>

            <div className="relative mt-auto">
              {/* Title with Masking */}
              <div className="absolute -top-12 left-0 bg-loop-yellow text-black px-4 py-1 font-mono text-xs font-bold uppercase tracking-tight transform -rotate-1 origin-bottom-left shadow-[4px_4px_0px_rgba(0,0,0,1)] z-20 border border-white">
                Audio Architecture
              </div>
              <h1 className="font-black text-[12vw] leading-[0.8] tracking-tighter analyzer-text select-none">
                SUPER<br />LOOP
              </h1>
              <p className="font-mono text-sm md:text-base text-white/80 max-w-xl mt-6 border-l-2 border-loop-orange pl-4 bg-black/50 backdrop-blur-md py-2 pr-2">
                A high-fidelity exploration of synthesis, sound design, and the raw architecture of electronic music production.
              </p>
            </div>
          </div>
        </div>

        {/* Right System Log & Controls */}
        <div className="w-full md:w-1/3 bg-[#050505] relative flex flex-col h-full">
          <div className="h-10 border-b border-white/10 flex items-center px-4 bg-[#111]">
            <span className="font-mono text-[10px] uppercase text-loop-orange">/// HARDWARE_ACCESS</span>
          </div>

          <div className="p-6 flex-1 flex flex-col justify-between blueprint-grid h-full">
            {/* Embedded CRT Display */}
            <div className="bg-black border-4 border-[#333] rounded-sm p-4 h-48 relative overflow-hidden shadow-[0_0_20px_rgba(255,100,0,0.1)]">
              <div className="absolute inset-0 bg-loop-orange/5 pointer-events-none z-10 mix-blend-screen"></div>
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none z-20"></div>

              <div className="font-mono text-xs text-loop-orange relative z-30 h-full flex flex-col justify-between">
                <div className="flex justify-between border-b border-loop-orange/30 pb-1 mb-2">
                  <span>AUDIO_ANALYZER</span>
                  <span className="animate-pulse">[ON]</span>
                </div>

                {/* Visualizer */}
                <div className="flex items-end h-20 gap-1 opacity-90 mt-auto">
                  {analyzerBars.map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-loop-orange"
                      style={{ height: `${height}%`, transition: 'height 0.1s ease-out' }}
                    ></div>
                  ))}
                </div>
                <div className="mt-4 opacity-70">&gt; AWAITING_INPUT...</div>
              </div>
            </div>

            {/* Hardware Keypad Mockup */}
            <div className="bg-[#222] p-4 rounded-sm border border-[#444] shadow-inner mt-8">
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 'A', 4, 5, 6, 'B', 7, 8, 9, 'C', '*', 0, '#', 'D'].map((key, idx) => (
                  <button
                    key={idx}
                    className="h-12 bg-loop-orange/5 border border-loop-orange/30 text-loop-orange font-mono text-sm font-bold rounded hover:bg-loop-orange hover:text-black hover:shadow-[0_0_15px_rgba(255,95,0,0.8)] active:translate-y-0.5 transition-all outline-none"
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

            {/* Slot */}
            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4">
              <div className="w-2 h-16 bg-black border border-white/20 rounded-full mx-auto shadow-inner"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Pack Section */}
      <section className="py-24 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto z-10 relative">
          <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-6">
            <div>
              <h2 className="font-black text-5xl tracking-tighter text-white">SOUNDPACK<br />AUTOMAT</h2>
            </div>
            <div className="text-right hidden md:block">
              <div className="font-mono text-xs text-white/50">MODEL: DISPENSER_v2.0</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 'A1', title: 'ACID_TEXTURE', style: '303_WAVEFORMS' },
              { id: 'B2', title: 'INDUSTRIAL_KICKS', style: 'HEAVY_IMPACT' },
              { id: 'C3', title: 'GLITCH_VOCALS', style: 'GRANULAR' }
            ].map((pack) => (
              <div key={pack.id} className="group cursor-pointer bg-gradient-to-b from-[#1a1a1a] to-[#111] p-6 border border-white/5 hover:border-loop-orange/50 transition-colors shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 group-hover:bg-loop-orange/10 transition-colors rounded-bl-full -z-0"></div>

                <div className="flex items-start justify-between relative z-10 mb-8">
                  <span className="font-mono text-3xl font-bold text-loop-orange group-hover:scale-110 transition-transform origin-top-left">{pack.id}</span>
                  <div className="w-10 h-10 flex items-center justify-center rounded bg-black border border-white/10 group-hover:border-loop-orange group-hover:text-loop-orange transition-colors">
                    <Download className="w-5 h-5" />
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="font-bold text-lg text-white tracking-tight mb-1">{pack.title}</h3>
                  <p className="font-mono text-[10px] text-white/50">{pack.style}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
