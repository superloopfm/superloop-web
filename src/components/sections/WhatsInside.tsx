import { Play, Pause, Lock } from 'lucide-react';
import { EXTENDED_STEMS } from '../../lib/constants';
import { useAudioPreview } from '../../hooks/useAudioPreview';

export function WhatsInside() {
  const { currentTrack, isPlaying, progress, play } = useAudioPreview();

  return (
    <section id="soundpacks" className="relative bg-brand-darker py-20 px-6 lg:pl-56">
      <div className="max-w-5xl">
        {/* Header */}
        <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-2">
          INSIDE THE PACK
        </div>
        <h2 className="font-display text-4xl md:text-5xl text-white tracking-wider mb-12">
          HEAR WHAT YOU GET
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Pack artwork */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[320px]">
              <img
                src="/images/landing page/founders-pack-1.png"
                alt="Founders Edition"
                className="w-full h-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const fallback = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              {/* CSS fallback */}
              <div className="hidden w-[280px] h-[360px] bg-brand-dark border border-white/10 flex-col items-center justify-center gap-4 mx-auto">
                <div className="font-display text-2xl text-white/10 tracking-wider">FOUNDERS</div>
                <div className="font-display text-xl text-white/20 tracking-wider">EDITION</div>
              </div>
            </div>
          </div>

          {/* Right: Expanded stem list */}
          <div className="flex flex-col gap-2">
            {EXTENDED_STEMS.map((stem) => {
              const isLocked = stem.status === 'locked';
              const isThisPlaying = currentTrack === stem.audioSrc && isPlaying;

              return (
                <div
                  key={stem.tag}
                  className={`flex items-center gap-4 py-3 px-4 border transition-all ${
                    isLocked
                      ? 'border-white/5 bg-white/[0.01] opacity-40'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/10'
                  }`}
                >
                  {/* Tag */}
                  <span className="font-mono text-xs text-white/40 w-8 shrink-0">{stem.tag}</span>

                  {/* Name + description */}
                  <div className="flex-1 min-w-0">
                    <div className={`font-mono text-sm font-bold uppercase truncate ${isLocked ? 'text-white/20 blur-[2px]' : 'text-white'}`}>
                      {stem.name}
                    </div>
                    {/* Progress bar */}
                    {isThisPlaying && (
                      <div className="w-full h-0.5 bg-white/10 mt-1">
                        <div
                          className="h-full bg-white transition-all duration-100"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <span className="font-mono text-[10px] text-white/30 hidden md:block shrink-0">
                    {stem.description}
                  </span>

                  {/* Play/Lock button */}
                  {isLocked ? (
                    <Lock className="w-4 h-4 text-white/20 shrink-0" />
                  ) : (
                    <button
                      onClick={() => stem.audioSrc && play(stem.audioSrc)}
                      className="text-white hover:text-white/70 transition-colors shrink-0 flex items-center gap-1 font-mono text-[10px]"
                    >
                      {isThisPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span className="hidden sm:inline">PREVIEW</span>
                    </button>
                  )}
                </div>
              );
            })}

            {/* Footer */}
            <div className="font-mono text-[10px] text-white/20 mt-2 tracking-wider">
              + BONUS CONTENT REVEALED ON OPEN
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
