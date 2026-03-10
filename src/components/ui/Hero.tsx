import { motion } from 'framer-motion';

interface HeroProps {
    analyzerBars: number[];
}

export function Hero({ analyzerBars }: HeroProps) {
    return (
        <header id="hero" className="relative min-h-[90vh] flex flex-col md:flex-row pt-14 border-b border-white/10">

            {/* Left Visual Area */}
            <div className="w-full md:w-2/3 relative border-r border-white/10 overflow-hidden group min-h-[60vh]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-150 brightness-75 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
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
                    <div className="bg-black border-4 border-[#333] rounded-sm p-4 h-48 relative overflow-hidden shadow-[0_0_20px_rgba(255,100,0,0.1)]">
                        <div className="absolute inset-0 bg-loop-orange/5 pointer-events-none z-10 mix-blend-screen"></div>
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none z-20"></div>

                        <div className="font-mono text-xs text-loop-orange relative z-30 h-full flex flex-col justify-between">
                            <div className="flex justify-between border-b border-loop-orange/30 pb-1 mb-2">
                                <span>AUDIO_ANALYZER</span>
                                <span className="animate-pulse">[ON]</span>
                            </div>

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

                    <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4">
                        <div className="w-2 h-16 bg-black border border-white/20 rounded-full mx-auto shadow-inner"></div>
                    </div>
                </div>
            </div>
        </header>
    );
}
