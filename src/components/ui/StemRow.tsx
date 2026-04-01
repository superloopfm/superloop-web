import { Disc, Mic2, Zap, Lock, Play, Pause } from 'lucide-react';
import type { Stem } from '../../lib/constants';

const ICON_MAP = {
  disc: Disc,
  mic: Mic2,
  zap: Zap,
  lock: Lock,
};

interface StemRowProps {
  stem: Stem;
  isPlaying?: boolean;
  showPreview?: boolean;
  onTogglePlay?: () => void;
}

export function StemRow({ stem, isPlaying = false, showPreview = false, onTogglePlay }: StemRowProps) {
  const Icon = ICON_MAP[stem.icon];
  const isLocked = stem.status === 'locked';

  return (
    <div
      className={`border-2 p-3 transition-all ${
        isLocked
          ? 'border-white/10 bg-white/[0.02] opacity-50 cursor-not-allowed'
          : 'border-white/20 bg-white/[0.03] hover:border-white/20'
      }`}
    >
      <div className="flex justify-between items-start mb-1">
        <span className="bg-white text-black text-[9px] px-1.5 py-0.5 font-mono font-bold">
          {stem.tag}
        </span>
        <Icon className={`w-4 h-4 ${isLocked ? 'text-white/30' : 'text-white/60'}`} />
      </div>
      <h3 className={`font-bold text-sm leading-tight uppercase mb-1 font-mono ${isLocked ? 'text-white/30' : 'text-white'}`}>
        {stem.name}
      </h3>
      <div className="flex justify-between items-end border-t border-dashed border-white/10 pt-1.5 mt-1.5">
        <span className="text-[9px] font-mono text-white/40">{stem.description}</span>
        <div className="flex items-center gap-2">
          {showPreview && !isLocked && onTogglePlay && (
            <button
              onClick={onTogglePlay}
              className="text-white hover:text-white/70 transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          )}
          <span className={`font-bold text-xs font-mono ${isLocked ? 'text-white/30' : 'text-white'}`}>
            {isLocked ? 'LOCKED' : 'DOWNLOAD'}
          </span>
        </div>
      </div>
    </div>
  );
}
