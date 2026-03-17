import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

export default function VendingEmailCapture() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [remaining, setRemaining] = useState<number | null>(null);

    useEffect(() => {
        // 1. Fetch initial count
        const fetchRemaining = async () => {
            const { data, error } = await supabase
                .from('scarcity_counters')
                .select('founders_remaining')
                .eq('id', 1)
                .single();

            if (data && !error) {
                setRemaining(data.founders_remaining);
            } else {
                // Fallback for demo if table missing
                setRemaining(100);
            }
        };

        fetchRemaining();

        // 2. Subscribe to realtime changes
        const channel = supabase
            .channel('public:scarcity_counters')
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'scarcity_counters',
                filter: 'id=eq.1'
            }, (payload) => {
                setRemaining(payload.new.founders_remaining);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        try {
            // 1. Insert email
            const { error: insertError } = await supabase
                .from('email_captures')
                .insert([{ email, campaign: 'founders_edition', timestamp: new Date().toISOString() }]);

            if (insertError) throw insertError;

            // 2. Decrement counter RPC (requires a Postgres function, or optimistic update for demo)
            // For now we'll attempt a direct update assuming RLS allows it to test the sync
            if (remaining && remaining > 0) {
                await supabase
                    .from('scarcity_counters')
                    .update({ founders_remaining: remaining - 1 })
                    .eq('id', 1);
            }

            setStatus('success');
            setEmail('');
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center p-6 text-center h-full bg-[#00FF41]/10 border border-[#00FF41]/30">
                <CheckCircle2 className="w-12 h-12 text-[#00FF41] mb-4 animate-[bounce_1s_ease-in-out_infinite]" />
                <h3 className="font-black font-mono text-xl uppercase tracking-tighter text-[#00FF41] mb-2">Record Claimed</h3>
                <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                    Transmitting to {email}
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-zinc-950 p-6 border border-zinc-800 shadow-2xl relative overflow-hidden group">
            {/* Decorative Grid */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
            ></div>

            <div className="relative z-10 flex flex-col h-full">
                {/* Scarcity Banner */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#FF3300] animate-pulse"></div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF3300]">Live Inventory</span>
                    </div>
                    <div className="bg-[#FF3300] text-black font-mono text-xs font-bold px-2 py-0.5">
                        {remaining !== null ? `${remaining} / 100` : '... / 100'} REMAINING
                    </div>
                </div>

                {/* Form Body */}
                <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-2 leading-none">
                        This is not a waitlist.
                        <br />
                        <span className="text-zinc-500">This is a record.</span>
                    </h3>
                    <p className="font-mono text-[10px] text-zinc-400 mt-4 mb-8 max-w-xs leading-relaxed">
                        Secure your Founders Edition soundpack. Digital delivery immediate. Physical pressing follows.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ENTER EMAIL ADDRESS"
                                required
                                disabled={status === 'loading'}
                                className="w-full bg-zinc-900 border border-zinc-700 text-white font-mono text-xs p-4 outline-none focus:border-[#FF3300] transition-colors placeholder:text-zinc-600"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-[#FF3300] hover:bg-white text-black font-mono font-bold text-sm uppercase tracking-widest p-4 transition-colors flex items-center justify-center gap-2 group/btn cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'loading' ? 'Transmitting...' : 'Claim Record'}
                            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>

                        {status === 'error' && (
                            <p className="font-mono text-[10px] text-red-500 mt-2 text-center uppercase">Transmission failed. Try again.</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
