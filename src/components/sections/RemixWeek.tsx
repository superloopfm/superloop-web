export function RemixWeek() {
  const scrollToFounders = () => {
    const el = document.querySelector('#founders');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="remix-week" className="relative bg-brand-black py-20 px-6 lg:pl-56 border-t border-white/5">
      <div className="max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Visual */}
          <div className="relative overflow-hidden">
            <img
              src="/images/remix-week.jpg"
              alt="Remix Week"
              className="w-full h-64 md:h-80 object-cover grayscale opacity-80"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                const fallback = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'block';
              }}
            />
            {/* CSS fallback */}
            <div
              className="hidden w-full h-64 md:h-80 bg-gradient-to-br from-brand-dark to-brand-black border border-white/5 relative"
            >
              <div className="absolute inset-0 bg-grid-dark" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="font-display text-4xl text-white/5 tracking-wider">RMX_LAB</div>
              </div>
            </div>
            {/* Border overlay */}
            <div className="absolute inset-3 border border-dashed border-white/10 pointer-events-none" />
          </div>

          {/* Right: Copy */}
          <div>
            <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-2">
              REMIX WEEK
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-white tracking-wider mb-6">
              SHOW UP. STAND OUT. GET HEARD.
            </h2>

            <div className="font-mono text-sm text-white/50 leading-relaxed mb-6 space-y-2">
              <p>EVERY SEASON, ONE SOUNDPACK DROPS. YOU REMIX IT.</p>
              <p>THE COMMUNITY VOTES. THE BEST GET PUBLISHED.</p>
            </div>

            {/* Orange badge */}
            <button
              onClick={scrollToFounders}
              className="bg-white text-black font-mono text-xs font-bold px-4 py-2 uppercase tracking-wider hover:bg-white/80 transition-colors mb-6"
            >
              &raquo; FOUNDERS GET A GUARANTEED SLOT IN SEASON 01
            </button>

            <div className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
              SEASON 01 — COMING SOON
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
