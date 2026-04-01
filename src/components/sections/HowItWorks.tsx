import { STEPS } from '../../lib/constants';

export function HowItWorks() {
  return (
    <section className="relative bg-brand-black py-20 px-6 lg:pl-56 border-t border-white/5">
      <div className="max-w-5xl">
        {/* Header */}
        <div className="font-mono text-xs text-white/40 uppercase tracking-widest mb-2">
          THE LOOP
        </div>
        <h2 className="font-display text-4xl md:text-5xl text-white tracking-wider mb-14">
          HOW IT WORKS
        </h2>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-white/10" />

          {STEPS.map((step, i) => (
            <div key={step.number} className="relative flex flex-col items-start lg:items-center text-left lg:text-center">
              {/* Number */}
              <div className="font-display text-5xl md:text-6xl text-white/20 leading-none mb-3">
                {step.number}
              </div>

              {/* Dot on the line */}
              <div className="hidden lg:block w-3 h-3 rounded-full bg-white border-2 border-brand-black mb-4 -mt-1" />

              {/* Title */}
              <h3 className="font-display text-xl md:text-2xl text-white tracking-wider mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="font-mono text-xs text-white/40 leading-relaxed max-w-[200px]">
                {step.desc}
              </p>

              {/* Arrow between steps (mobile) */}
              {i < STEPS.length - 1 && (
                <div className="lg:hidden font-mono text-white/20 text-lg mt-4 mb-2">&darr;</div>
              )}
            </div>
          ))}
        </div>

        {/* Footer tagline */}
        <div className="font-mono text-[10px] text-white/15 uppercase tracking-widest mt-14 text-center">
          EVERY LOOP LEAVES A TRACE.
        </div>
      </div>
    </section>
  );
}
