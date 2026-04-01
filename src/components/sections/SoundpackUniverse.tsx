export function SoundpackUniverse() {
  return (
    <section className="relative bg-brand-darker py-16 px-6 lg:pl-56 border-t border-white/5 min-h-[35vh]">
      <div className="max-w-5xl">
        {/* Header */}
        <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-2">
          THE COLLECTION
        </div>
        <h2 className="font-display text-3xl md:text-4xl text-white tracking-wider mb-12">
          MORE MACHINES OPENING SOON
        </h2>

        {/* Machine silhouettes — using real pack art, dimmed/locked */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* Machine 1 — Kaidan (Gold glow) */}
          <div className="w-[200px] h-[300px] bg-brand-dark border border-[#DAA520]/20 glow-gold relative overflow-hidden group">
            <div className="absolute inset-0 dot-grid opacity-20" />
            <img
              src="/images/landing page/kaidan-ronin-pack-1.png"
              alt="Coming Soon"
              className="absolute inset-0 w-full h-full object-cover opacity-15 grayscale blur-[1px] group-hover:opacity-25 transition-opacity duration-500"
            />
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full border border-[#DAA520]/30 bg-[#DAA520]/5" />
              <div className="font-mono text-[10px] text-[#DAA520]/50 uppercase tracking-widest">
                SEASON 01
              </div>
            </div>
          </div>

          {/* Machine 2 — Sunset Tempo (Red glow) */}
          <div className="w-[200px] h-[300px] bg-brand-dark border border-[#8B0000]/20 glow-red relative overflow-hidden group">
            <div className="absolute inset-0 dot-grid opacity-20" />
            <img
              src="/images/landing page/sunsettempo-pack-1.png"
              alt="Coming Soon"
              className="absolute inset-0 w-full h-full object-cover opacity-15 grayscale blur-[1px] group-hover:opacity-25 transition-opacity duration-500"
            />
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full border border-[#8B0000]/30 bg-[#8B0000]/5" />
              <div className="font-mono text-[10px] text-[#8B0000]/50 uppercase tracking-widest">
                ENCRYPTED
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="font-mono text-[10px] text-white/15 uppercase tracking-widest mt-10 text-center">
          NEW MACHINES OPEN EVERY SEASON.
        </div>
      </div>
    </section>
  );
}
