import { useState, useEffect } from 'react';
import { Navigation } from './components/ui/Navigation';
import { Hero } from './components/ui/Hero';
import { SoundpackDispenser } from './components/ui/SoundpackDispenser';
import { RemixLab } from './components/audio/RemixLab';

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

      <Navigation />
      <Hero analyzerBars={analyzerBars} />
      <RemixLab />
      <SoundpackDispenser />

      <footer className="py-8 bg-black border-t border-white/10 text-center">
        <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
          SUPERLOOP.FM // SYSTEM V2.0 // AUDIO ARCHITECTURE
        </div>
      </footer>
    </div>
  );
}
