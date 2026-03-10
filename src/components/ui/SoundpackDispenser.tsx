import { Download } from 'lucide-react';

export function SoundpackDispenser() {
    return (
        <section id="automat" className="py-24 px-6 md:px-12 relative border-t border-white/10">
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
    );
}
