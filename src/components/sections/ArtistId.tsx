import { ARTIST_TIERS } from '../../lib/constants';
import { ArtistIdCard } from '../ui/ArtistIdCard';

export function ArtistId() {
  return (
    <section id="artist-id" className="relative bg-brand-darker py-20 px-6 lg:pl-56 border-t border-white/5">
      <div className="max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-2">
              ARTIST ID
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-white tracking-wider mb-6">
              EARN YOUR NAME
            </h2>

            <div className="font-mono text-sm text-white/50 leading-relaxed mb-6 space-y-2">
              <p>EVERY REMIX BUILDS YOUR REPUTATION.</p>
              <p>YOUR CARD EVOLVES. YOUR STATS GROW.</p>
              <p>THE BEST EARN ARTIST ID — AND GET SIGNED.</p>
            </div>

            {/* Tier strip */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              {ARTIST_TIERS.map((tier, i) => (
                <span key={tier} className="flex items-center gap-2">
                  <span className={`font-mono text-[10px] uppercase tracking-wider ${
                    tier === 'ARTIST ID' ? 'text-white font-bold' : 'text-white/30'
                  }`}>
                    {tier}
                  </span>
                  {i < ARTIST_TIERS.length - 1 && (
                    <span className="text-white/15 font-mono text-xs">&rarr;</span>
                  )}
                </span>
              ))}
            </div>

            <div className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
              LAUNCHING WITH SEASON 01
            </div>
          </div>

          {/* Right: Artist ID Card */}
          <div className="flex items-center justify-center">
            <ArtistIdCard />
          </div>
        </div>
      </div>
    </section>
  );
}
