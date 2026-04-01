import { QrCode, Package, Lock, ArrowDown, Disc } from 'lucide-react';
import { HERO, STEMS, NAV_ITEMS } from '../lib/constants';
import { EmailCaptureBar } from '../components/ui/EmailCaptureBar';

export default function LegacyLanding() {
  return (
    <div className="bg-brand-black text-white font-body antialiased overflow-x-hidden selection:bg-white selection:text-black">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0f0f0f] via-[#0a0a0a] to-[#050505] opacity-80"></div>
      </div>

      {/* Main Grid Container */}
      <main className="relative z-10 w-full min-h-screen grid grid-cols-[3rem_1fr_3rem] md:grid-cols-[14rem_1fr_4rem] border-x border-white/5 bg-transparent">

        {/* LEFT MARGIN: Navigation Sidebar */}
        <aside className="relative border-r border-white/5 h-full hidden md:flex flex-col items-center px-2 py-8 bg-brand-black/50 backdrop-blur-sm">
          <img src="/logos/superloop-bl-1.png" alt="Superloop" className="w-8 h-8 object-contain invert" />
          <div className="w-px h-16 bg-white/10 my-4"></div>
          <nav className="flex flex-col items-center text-center gap-6 w-full">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="group flex flex-col items-center gap-1 font-mono text-[11px] uppercase font-bold tracking-widest text-white/50 hover:text-white transition-colors">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs">&rarr;</span>
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* CENTER CONTENT */}
        <section className="relative w-full h-full grid grid-cols-1 lg:grid-cols-12 grid-rows-[auto_auto_1fr] gap-0">

          {/* Top Header */}
          <header className="col-span-1 lg:col-span-12 border-b border-white/5 py-1.5 px-6 flex justify-between items-center relative bg-brand-black/80 backdrop-blur-sm">
            <div>
              <img src="/logos/superloop-text-white-1.png" alt="Superloop.fm" className="h-6 md:h-10 object-contain" onError={(e) => { (e.target as HTMLImageElement).src = '/logos/superloop-text-bl-1.png'; (e.target as HTMLImageElement).classList.add('invert'); }} />
            </div>
            <div className="hidden md:flex gap-6 items-center">
              <div className="text-right">
                <div className="text-xs font-mono text-white/30 uppercase">Issue Date</div>
                <div className="text-sm font-semibold tracking-tight text-white/60">{HERO.issueDate}</div>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="border border-white/20 p-1">
                <QrCode className="w-8 h-8 text-white/40" />
              </div>
            </div>
          </header>

          {/* ROW 1: Hero — headline + founders bag below header + morphing subheadline */}
          <div className="col-span-1 lg:col-span-12 relative overflow-hidden min-h-[50vh] border-b border-white/5">
            {/* Background Video */}
            <div className="absolute right-0 top-0 w-full lg:w-[95%] h-full overflow-hidden pointer-events-none z-0">
              <video src="/videos/hero-bg.mp4" muted loop autoPlay playsInline className="w-full h-full object-cover opacity-20" />
              <div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-brand-black to-transparent"></div>
            </div>

            {/* Content — pack LEFT aligned to headline height, text RIGHT */}
            <div className="absolute left-0 top-[42%] -translate-y-1/2 w-full z-30 px-8 lg:px-16">
              <div className="flex flex-col-reverse lg:flex-row items-start gap-8 lg:gap-10 w-full">

                {/* Left — Founders bag, height-matched to headline */}
                <div className="hidden lg:flex flex-shrink-0 items-start pt-1">
                  <img
                    src="/images/landing page/founders-pack-1.png"
                    alt="Founders Edition"
                    className="h-[14vw] w-auto object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                  />
                </div>

                {/* Right — Text stack */}
                <div className="flex-1 flex flex-col items-start">
                  <h2 className="text-[13vw] lg:text-[6.5vw] leading-[0.82] font-black tracking-tighter mb-6 text-white drop-shadow-md">
                    {HERO.headline[0]}<br />{HERO.headline[1]}
                  </h2>

                  {/* Morphing color spectrum subheadline */}
                  <div className="mt-2 mb-8">
                    <span className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-black uppercase tracking-tight bg-clip-text text-transparent" style={{
                      backgroundImage: 'linear-gradient(90deg, #fff, #a78bfa, #f472b6, #fb923c, #34d399, #60a5fa, #fff)',
                      backgroundSize: '300% 100%',
                      animation: 'morphGradient 4s ease-in-out infinite',
                      WebkitBackgroundClip: 'text',
                    }}>
                      {HERO.subHeadline}
                    </span>
                  </div>

                  <a href="#vending" className="inline-flex items-center gap-4 bg-white text-black px-8 py-4 font-mono font-black text-sm uppercase tracking-widest hover:bg-white/90 transition-colors duration-300 group">
                    CLAIM YOURS
                    <ArrowDown className="w-5 h-5 group-hover:animate-bounce" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 2: Three-Column Content Blocks */}
          <div className="col-span-1 lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 min-h-[40vh]">

            {/* Block A: Vending Machine */}
            <div className="col-span-1 lg:col-span-3 border-r border-white/5 bg-brand-black p-4 relative overflow-hidden">
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-full relative mx-auto">
                    <img src="/images/landing page/vending-temp-1.png" alt="Vending Machine" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            </div>

            {/* Block B: Founders Cards — 3-card stack, large */}
            <div className="col-span-1 lg:col-span-4 flex flex-col bg-brand-darker border-r border-white/5">
              <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
                <div className="w-full max-w-[380px] relative mx-auto">
                  {/* Card 3 (deepest) — black, offset most */}
                  <div className="absolute top-6 left-6 w-full z-0">
                    <img
                      src="/images/landing page/founders-black-soundpack-card.png"
                      alt="Founders Card 3"
                      className="w-full h-auto object-contain opacity-30"
                    />
                  </div>
                  {/* Card 2 (middle) — black, offset slightly */}
                  <div className="absolute top-3 left-3 w-full z-[1]">
                    <img
                      src="/images/landing page/founders-black-soundpack-card.png"
                      alt="Founders Card 2"
                      className="w-full h-auto object-contain opacity-55"
                    />
                  </div>
                  {/* Card 1 (front) — white */}
                  <div className="relative z-10">
                    <img
                      src="/images/landing page/founders-white-soundpack-card.png"
                      alt="Founders Edition Card"
                      className="w-full h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                </div>
              </div>

              {/* Soundpack Content Panel — WHITE PAD CARDS */}
              <div className="border-t border-white/10">
                <div className="p-3 border-b border-white/10 bg-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-white/40" />
                    <span className="font-mono text-sm font-bold uppercase tracking-wide text-white/60">Soundpack_Content</span>
                  </div>
                  <span className="text-[10px] font-mono border border-white/20 px-1 text-white/40">V.4.0</span>
                </div>
                <div className="flex flex-col p-3 gap-2">
                  {STEMS.map((stem) => {
                    const isLocked = stem.status === 'locked';
                    return (
                      <button
                        key={stem.tag}
                        className={`group w-full text-left p-3 transition-all duration-150 select-none ${
                          isLocked
                            ? 'bg-white/[0.03] border-2 border-white/5 opacity-40 cursor-not-allowed'
                            : 'bg-white border-2 border-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]'
                        }`}
                        disabled={isLocked}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className={`text-[9px] px-1 font-mono font-bold ${isLocked ? 'bg-white/10 text-white/30' : 'bg-black text-white'}`}>{stem.tag}</span>
                          {isLocked ? <Lock className="w-4 h-4 text-white/20" /> : <Disc className="w-4 h-4 text-black/60 group-hover:animate-spin" />}
                        </div>
                        <h3 className={`font-bold text-sm leading-tight uppercase mb-1 ${isLocked ? 'text-white/30' : 'text-black'}`}>{stem.name}</h3>
                        <div className={`flex justify-between items-end border-t border-dashed pt-1 mt-1 ${isLocked ? 'border-white/10' : 'border-black/20'}`}>
                          <span className={`text-[9px] font-mono ${isLocked ? 'text-white/20' : 'text-black/50'}`}>{stem.description}</span>
                          <span className={`font-bold text-xs ${isLocked ? 'text-white/20' : 'text-black'}`}>
                            {isLocked ? 'LOCKED' : 'DOWNLOAD'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Block C: Right column — Editorial + Value list */}
            <div className="col-span-1 lg:col-span-5 border-l border-white/5 -mr-[3rem] md:-mr-[14rem] pr-[3rem] md:pr-[14rem] pl-6 py-6 flex flex-col justify-between bg-brand-black text-white overflow-hidden">

              <div className="border-l-2 border-white/20 pl-4 mb-6">
                <div className="flex items-start gap-5 mb-4">
                  <h2 className="text-6xl font-black uppercase tracking-tighter leading-none bg-clip-text text-transparent" style={{
                    backgroundImage: 'linear-gradient(90deg, #fff, #a78bfa, #f472b6, #fb923c, #34d399, #60a5fa, #fff)',
                    backgroundSize: '300% 100%',
                    animation: 'morphGradient 4s ease-in-out infinite',
                    WebkitBackgroundClip: 'text',
                  }}>
                    Claim<br />Now
                  </h2>
                  <div className="bg-white text-black p-4 shadow-[6px_6px_0px_rgba(255,255,255,0.15)] flex-shrink-0">
                    <div className="font-mono text-[9px] uppercase tracking-widest mb-1 opacity-50">SP FOUNDERS</div>
                    <h3 className="font-black text-xl uppercase leading-none tracking-tighter">Break<br />The Loop</h3>
                    <div className="font-mono text-[9px] mt-2 uppercase tracking-widest opacity-50">VOL.1 // FOUNDERS EDITION</div>
                  </div>
                </div>
                <div className="font-mono text-[9px] text-white/30 grid grid-cols-2 gap-4 max-w-sm">
                  <p>01 // FOUNDERS VAULT<br />3-5 unreleased tracks<br />Stems included</p>
                  <p>02 // BADGE #001-100<br />Numbered edition<br />Never reprinted</p>
                  <p>03 // PLUGIN PASS<br />Exclusive skins<br />Early access forever</p>
                  <p>04 // SEASON 01 ENTRY<br />Guaranteed slot<br />Skip the waitlist</p>
                </div>
              </div>

              {/* Value list */}
              <div className="flex flex-col">
                <div className="flex justify-between items-end mb-3 border-b border-white/10 pb-1">
                  <span className="font-mono text-[10px] text-white uppercase tracking-widest">What_You_Get</span>
                  <span className="font-mono text-[10px] text-white/20">VALUE: $417+</span>
                </div>
                <div className="space-y-3">
                  {[
                    { id: 'A1', name: 'Founders_Vault', desc: 'UNRELEASED_TRACKS // STEMS' },
                    { id: 'B2', name: 'Plugin_Pass', desc: 'EXCLUSIVE_SKINS // EARLY_ACCESS' },
                    { id: 'C3', name: 'Season_01_Entry', desc: 'REMIX_WEEK // GUARANTEED_SLOT' },
                  ].map((pack) => (
                    <button key={pack.id} className="w-full bg-brand-dark border-2 border-white/10 p-4 rounded-none flex items-center justify-between group text-left shadow-[3px_3px_0px_white] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none hover:border-white/30 transition-all">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xl font-bold text-white group-hover:text-white transition-colors">{pack.id}</span>
                        <div>
                          <div className="font-bold text-sm uppercase tracking-tight text-white">{pack.name}</div>
                          <div className="font-mono text-[9px] text-white/30">{pack.desc}</div>
                        </div>
                      </div>
                      <div className="w-8 h-8 flex items-center justify-center border border-white/10 bg-black group-hover:bg-white group-hover:text-black transition-colors">
                        <ArrowDown className="w-4 h-4" />
                      </div>
                    </button>
                  ))}
                  <button className="w-full bg-brand-dark border border-white/5 p-4 flex items-center justify-between text-left opacity-40 cursor-not-allowed">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xl font-bold text-white/20">D4</span>
                      <div>
                        <div className="font-bold text-sm uppercase tracking-tight text-white/30">2026_Vault_Access</div>
                        <div className="font-mono text-[9px] text-white/15">LOCKED_UNTIL_CLAIM</div>
                      </div>
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center border border-white/5 bg-brand-dark text-white/15">
                      <Lock className="w-4 h-4" />
                    </div>
                  </button>
                </div>
                <div className="mt-6 pt-4 border-t border-dashed border-white/5 flex justify-between font-mono text-[9px] text-white/15">
                  <span>SYS.ID: 884-21X</span>
                  <span>STATUS: ONLINE</span>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-auto pt-10 pb-4 flex flex-col items-center justify-center">
                <div className="text-3xl font-black text-white tracking-tighter text-center mb-2">
                  YOUR PRICE: <span className="text-white">FREE</span>
                </div>
                <span className="font-mono text-sm font-bold text-white/60 uppercase tracking-widest mb-4 animate-pulse text-center">
                  Claim Your Pack Below
                </span>
                <ArrowDown className="w-16 h-16 lg:w-20 lg:h-20 text-white/60 animate-bounce" strokeWidth={3} />
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT MARGIN */}
        <aside className="relative border-l border-white/5 h-full hidden md:flex flex-col py-12 bg-brand-black/50 backdrop-blur-sm">
          <div className="flex-1 flex flex-col items-center gap-12">
            <div className="relative h-32 w-1 bg-white/5 rounded-full overflow-hidden">
              <div className="absolute bottom-0 w-full h-1/3 bg-white/20"></div>
            </div>
            <div className="rotate-180 [writing-mode:vertical-rl] text-[0.65rem] font-mono tracking-widest text-white/15 uppercase flex items-center gap-8 whitespace-nowrap">
              <span>SUPERLOOP.FM</span>
              <span>FOUNDERS_EDITION</span>
              <span>V.4.0</span>
            </div>
          </div>
        </aside>
      </main>

      {/* Email Capture Section */}
      <div id="vending" className="relative z-10">
        <EmailCaptureBar />
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-brand-black text-white/30 py-6 text-center text-xs font-mono uppercase tracking-widest border-t border-white/5">
        &copy; 2026 DRASTIC MUSIC LLC &mdash; EVERY LOOP LEAVES A TRACE.
      </footer>
    </div>
  );
}
