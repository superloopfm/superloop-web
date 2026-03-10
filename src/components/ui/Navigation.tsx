

export function Navigation() {
    return (
        <nav className="fixed top-0 left-0 w-full h-14 border-b border-white/10 flex items-center justify-between px-6 z-50 bg-black/80 backdrop-blur-md">
            <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-loop-orange animate-pulse"></div>
                <span className="font-mono text-xs uppercase tracking-widest text-white/70">System_Online</span>
            </div>
            <div className="hidden md:flex gap-6 font-mono text-xs uppercase">
                <a href="#hero" className="hover:text-loop-orange transition-colors">Manifesto</a>
                <a href="#remix" className="hover:text-loop-orange transition-colors">Remix Lab</a>
                <a href="#automat" className="hover:text-loop-orange transition-colors">Soundpack</a>
            </div>
        </nav>
    );
}
