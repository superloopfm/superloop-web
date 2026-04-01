import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../../lib/constants';

export function Sidebar() {
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string) => {
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-[60] lg:hidden bg-brand-dark/80 backdrop-blur-sm border border-white/10 p-2"
      >
        <Menu className="w-5 h-5 text-white" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-sm lg:hidden flex flex-col items-center justify-center gap-8">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 text-white/60 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className="font-mono text-xl uppercase tracking-widest text-white/70 hover:text-white transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-48 hidden lg:flex flex-col items-start pl-6 pr-4 py-8 bg-brand-black/80 backdrop-blur-sm border-r border-white/5 z-40">
        {/* Logo */}
        <img
          src="/logos/superloop-bl-1.png"
          alt="Superloop"
          className="w-8 h-8 object-contain invert"
        />

        {/* Vertical line */}
        <div className="w-6 h-px bg-white/10 my-5" />

        {/* Nav — left aligned, bigger */}
        <nav className="flex flex-col items-start gap-5 w-full">
          {NAV_ITEMS.map((item, i) => {
            const isActive = activeSection === item.href;
            return (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className="group flex items-center gap-2 font-mono text-sm md:text-base uppercase font-bold tracking-wide transition-colors"
              >
                <span
                  className="text-[10px] transition-opacity bg-clip-text text-transparent"
                  style={{
                    opacity: isActive ? 1 : 0,
                    backgroundImage: 'linear-gradient(90deg, #a78bfa, #f472b6, #fb923c, #34d399)',
                    WebkitBackgroundClip: 'text',
                    transition: 'opacity 0.2s',
                  }}
                >
                  &rarr;
                </span>
                <span
                  className={isActive ? 'bg-clip-text text-transparent' : 'text-white/50 group-hover:text-white/80 transition-colors'}
                  style={isActive ? {
                    backgroundImage: `linear-gradient(90deg, #fff, #a78bfa, #f472b6, #fb923c, #34d399, #60a5fa, #fff)`,
                    backgroundSize: '300% 100%',
                    animation: `morphGradient ${5 + i * 0.3}s ease-in-out infinite`,
                    WebkitBackgroundClip: 'text',
                  } : undefined}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Vertical line to bottom */}
        <div className="w-px flex-1 bg-white/5 my-6 ml-1" />

        {/* Bottom tagline */}
        <div className="font-mono text-[8px] text-white/20 uppercase tracking-widest [writing-mode:vertical-rl] rotate-180 ml-1">
          EVERY LOOP LEAVES A TRACE
        </div>
      </aside>
    </>
  );
}
