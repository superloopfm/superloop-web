import { useState, useEffect, useRef } from 'react';
import { Reorder } from 'framer-motion';
import * as Tone from 'tone';

// Mock Stems for the UI prototype
const MOCK_STEMS = [
    { id: 'stem-1', name: 'Kick_Deep.wav', type: 'DRUM', color: 'bg-loop-orange', file: '/audio/kick.wav' },
    { id: 'stem-2', name: 'Bass_Sub.wav', type: 'BASS', color: 'bg-blue-500', file: '/audio/bass.wav' },
    { id: 'stem-3', name: 'Synth_Arp.wav', type: 'LEAD', color: 'bg-loop-yellow', file: '/audio/synth.wav' },
    { id: 'stem-4', name: 'Vocal_Chop.wav', type: 'VOX', color: 'bg-pink-500', file: '/audio/vox.wav' }
];

export function RemixLab() {
    const [stems, setStems] = useState(MOCK_STEMS);
    const [masterFader, setMasterFader] = useState(50);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Audio references
    const playersRef = useRef<{ [key: string]: Tone.Player }>({});
    const masterVolRef = useRef<Tone.Volume | null>(null);

    useEffect(() => {
        // Initialize Tone.js audio graph on mount
        const initAudio = async () => {
            try {
                masterVolRef.current = new Tone.Volume(0).toDestination();

                // Load dummy players (would be real URLs in production)
                stems.forEach(stem => {
                    // Creating players with empty buffer/oscillator for demo purposes if files don't exist
                    playersRef.current[stem.id] = new Tone.Player().connect(masterVolRef.current as Tone.Volume);
                    playersRef.current[stem.id].loop = true;
                });

                setIsLoaded(true);
            } catch (err) {
                console.error("Audio failed to init", err);
            }
        };
        initAudio();

        return () => {
            // Cleanup
            Object.values(playersRef.current).forEach(p => p.dispose());
            if (masterVolRef.current) masterVolRef.current.dispose();
        };
    }, []);

    // Update master volume when fader moves (mapping 0-100 to decibels)
    useEffect(() => {
        if (masterVolRef.current) {
            // Convert linear 0-100 slider to Decibels roughly (-60 to +6)
            const db = masterFader === 0 ? -Infinity : 20 * Math.log10(masterFader / 50);
            masterVolRef.current.volume.rampTo(db, 0.1);
        }
    }, [masterFader]);

    const togglePlayback = async () => {
        if (!isLoaded) return;

        if (Tone.getContext().state !== 'running') {
            await Tone.start();
        }

        if (isPlaying) {
            Object.values(playersRef.current).forEach(p => p.stop());
            setIsPlaying(false);
        } else {
            // Small timeout to ensure aligned start for simple loopers
            const now = Tone.now();
            Object.values(playersRef.current).forEach(p => p.start(now));
            setIsPlaying(true);
        }
    };

    return (
        <section id="remix" className="relative min-h-screen py-24 bg-[#080808] border-b border-t border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="relative h-32 mb-16 select-none flex justify-between items-start">
                    <h2 className="text-8xl md:text-9xl font-black text-white/90 leading-none tracking-tighter absolute top-0 left-0 w-full mix-blend-difference pointer-events-none">
                        REMIX LAB
                    </h2>
                    <div className="absolute top-0 right-0 flex gap-4">
                        <button
                            onClick={togglePlayback}
                            className={`font-mono text-sm px-4 py-2 font-bold transition-colors ${isPlaying ? 'bg-loop-orange text-black border-loop-orange' : 'bg-black text-white border-white/30'} border shadow-lg z-20 cursor-pointer flex items-center gap-2`}
                        >
                            {isPlaying ? '⏹ STOP_AUDIO' : '▶ PLAY_STACK'}
                        </button>
                        <div className="font-mono text-sm text-loop-orange bg-black px-2 py-2 border border-loop-orange shadow-lg z-20">
                            SWIPE_TO_STACK
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-12 mt-12">
                    {/* Master Fader Sidebar */}
                    <div className="w-full md:w-24 flex md:flex-col items-center justify-between md:justify-start bg-[#111] border border-[#222] p-4 py-8 rounded shadow-2xl relative">
                        <div className="font-mono text-[10px] text-white/50 mb-4 tracking-widest hidden md:block rotate-180" style={{ writingMode: 'vertical-rl' }}>
                            MASTER_BUS
                        </div>

                        <div className="h-2 w-full md:h-64 relative md:w-full flex justify-center">
                            <input
                                type="range"
                                min="0" max="100"
                                value={masterFader}
                                onChange={(e) => setMasterFader(Number(e.target.value))}
                                className="w-full md:h-full md:w-2 md:rotate-180 accent-loop-orange cursor-ns-resize"
                            />
                        </div>

                        <div className="font-mono text-xs text-loop-orange mt-4">VOL: {masterFader}</div>
                    </div>

                    {/* Swipe-to-Stack Engine (React Reorder) */}
                    <div className="flex-1 border border-white/10 bg-black/50 p-6 md:p-12 backdrop-blur-md relative overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
                        <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-white/10">
                            <div className="absolute top-2 right-2 text-white/20 font-mono text-[9px] text-right">STACK_ENGINE<br />REV: 1.0.3</div>
                        </div>

                        <h3 className="text-4xl font-bold text-white mb-2">Signal Chain</h3>
                        <p className="font-mono text-xs text-gray-400 mb-8 max-w-xl">
                            Drag and drop stems to alter the processing order. Active stems override underlying frequencies. Tone.js audio graph updates in real-time.
                        </p>

                        {/* Draggable Stack */}
                        <Reorder.Group axis="y" values={stems} onReorder={setStems} className="space-y-4">
                            {stems.map((stem) => (
                                <Reorder.Item
                                    key={stem.id}
                                    value={stem}
                                    className="bg-[#1a1a1a] border border-white/10 p-4 cursor-grab active:cursor-grabbing hover:border-white/30 transition-colors flex items-center justify-between group shadow-lg"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-3 h-3 rounded-full ${stem.color} ${isPlaying ? 'animate-pulse' : ''}`}></div>
                                        <div>
                                            <div className="font-mono text-[10px] text-white/50 mb-1">{stem.type}</div>
                                            <div className="font-bold text-white text-lg tracking-wide">{stem.name}</div>
                                        </div>
                                    </div>

                                    {/* Mock Waveform Mini */}
                                    <div className={`hidden md:flex items-end h-8 gap-[2px] w-32 ${isPlaying ? 'opacity-100' : 'opacity-40'} transition-opacity`}>
                                        {[...Array(12)].map((_, i) => (
                                            <div key={i} className={`flex-1 ${stem.color} ${isPlaying ? 'animate-flicker' : ''}`} style={{ height: `${Math.random() * 80 + 20}%` }}></div>
                                        ))}
                                    </div>

                                    <div className="text-white/20 group-hover:text-white/60">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1" /><circle cx="9" cy="5" r="1" /><circle cx="9" cy="19" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="15" cy="5" r="1" /><circle cx="15" cy="19" r="1" /></svg>
                                    </div>
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>

                    </div>
                </div>
            </div>
        </section>
    );
}
