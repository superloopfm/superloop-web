import { useCallback, useRef } from 'react';
import { animate } from 'animejs';

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);

  const handleNavEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const arrow = e.currentTarget.querySelector('.nav-arrow') as HTMLElement | null;
    if (arrow) {
      animate(arrow, {
        translateX: ['-4px', '0px'],
        opacity: [0, 1],
        duration: 200,
        ease: 'outCubic',
      });
    }
    animate(e.currentTarget, {
      letterSpacing: ['0.1em', '0.15em'],
      duration: 200,
      ease: 'outQuad',
    });
  }, []);

  const handleNavLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const arrow = e.currentTarget.querySelector('.nav-arrow') as HTMLElement | null;
    if (arrow) {
      animate(arrow, {
        opacity: [1, 0],
        duration: 150,
        ease: 'inQuad',
      });
    }
    animate(e.currentTarget, {
      letterSpacing: ['0.15em', '0.1em'],
      duration: 150,
      ease: 'inQuad',
    });
  }, []);

  return (
    <aside className="relative border-r border-zinc-300 h-full hidden md:flex flex-col items-center px-2 py-8 bg-zinc-50/50 backdrop-blur-sm">
      {/* Logo */}
      <img src="/logos/superloop-bl-1.png" alt="Superloop" className="w-8 h-8 object-contain" />

      {/* Vertical line from logo to nav */}
      <div className="w-px h-16 bg-zinc-300 my-4"></div>

      {/* Nav Menu */}
      <nav ref={navRef} className="flex flex-col items-center text-center gap-6 w-full">
        {/* Studio / Remix — Active */}
        <a
          href="#"
          className="group flex flex-col items-center gap-1 font-mono text-sm uppercase font-bold tracking-widest text-zinc-900 hover:text-[#FF3300] transition-colors"
          onMouseEnter={handleNavEnter}
          onMouseLeave={handleNavLeave}
        >
          <span className="nav-arrow opacity-0 text-[#FF3300] text-xs">-&gt;</span>
          Studio / Remix
        </a>

        {/* Soundpacks — Active */}
        <a
          href="#"
          className="group flex flex-col items-center gap-1 font-mono text-sm uppercase font-bold tracking-widest text-zinc-900 hover:text-[#FF3300] transition-colors"
          onMouseEnter={handleNavEnter}
          onMouseLeave={handleNavLeave}
        >
          <span className="nav-arrow opacity-0 text-[#FF3300] text-xs">-&gt;</span>
          Soundpacks
        </a>

        {/* Artist ID — Active */}
        <a
          href="#"
          className="group flex flex-col items-center gap-1 font-mono text-sm uppercase font-bold tracking-widest text-zinc-900 hover:text-[#FF3300] transition-colors"
          onMouseEnter={handleNavEnter}
          onMouseLeave={handleNavLeave}
        >
          <span className="nav-arrow opacity-0 text-[#FF3300] text-xs">-&gt;</span>
          Artist ID
        </a>

        {/* Divider */}
        <div className="w-8 h-px bg-zinc-200"></div>

        {/* Leaderboard */}
        <a
          href="#"
          className="group flex flex-col items-center gap-1 font-mono text-sm uppercase font-bold tracking-widest text-zinc-900 hover:text-[#FF3300] transition-colors"
          onMouseEnter={handleNavEnter}
          onMouseLeave={handleNavLeave}
        >
          <span className="nav-arrow opacity-0 text-[#FF3300] text-xs">-&gt;</span>
          Leaderboard
        </a>

        {/* Remix Trees */}
        <a
          href="#"
          className="group flex flex-col items-center gap-1 font-mono text-sm uppercase font-bold tracking-widest text-zinc-900 hover:text-[#FF3300] transition-colors"
          onMouseEnter={handleNavEnter}
          onMouseLeave={handleNavLeave}
        >
          <span className="nav-arrow opacity-0 text-[#FF3300] text-xs">-&gt;</span>
          Remix Trees
        </a>
      </nav>
    </aside>
  );
}
