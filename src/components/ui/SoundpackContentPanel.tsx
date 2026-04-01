import { Package } from 'lucide-react';
import { STEMS } from '../../lib/constants';
import { StemRow } from './StemRow';

export function SoundpackContentPanel() {
  return (
    <div className="border border-white/20 bg-brand-dark">
      {/* Header bar */}
      <div className="px-3 py-2 border-b border-white/20 bg-white/5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Package className="w-3.5 h-3.5 text-white/60" />
          <span className="font-mono text-xs font-bold text-white/80 uppercase tracking-wide">
            SOUNDPACK_CONTENT
          </span>
        </div>
        <span className="text-[10px] font-mono border border-white/20 px-1.5 py-0.5 text-white/50">
          V.4.0
        </span>
      </div>

      {/* Stem rows */}
      <div className="p-3 flex flex-col gap-2">
        {STEMS.map((stem) => (
          <StemRow key={stem.tag} stem={stem} />
        ))}
      </div>
    </div>
  );
}
