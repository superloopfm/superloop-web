import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

export default function VendingMachine() {
  const [email, setEmail] = useState("");
  const [vendState, setVendState] = useState<"idle" | "loading" | "won" | "already" | "error">("idle");
  const [prize, setPrize] = useState<{ tier: number; label: string } | null>(null);

  async function handleVend() {
    if (!email.trim()) return;
    setVendState("loading");
    try {
      const { data, error } = await supabase.functions.invoke('vend', {
        body: { email: email.trim() },
      });
      if (error) {
        setVendState("error");
        return;
      }
      if (data?.success) {
        setPrize({ tier: data.tier, label: data.label });
        setVendState("won");
      } else if (data?.error === 'already_entered') {
        setPrize(data.label ? { tier: data.tier, label: data.label } : null);
        setVendState("already");
      } else {
        setVendState("error");
      }
    } catch {
      setVendState("error");
    }
  }

  return (
    <div className="col-span-full bg-neutral-950 border-t-2 border-zinc-300 py-8 px-4 sm:px-8 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

        {/* COL 2: Glitch Image */}
        <div className="lg:col-span-5 flex flex-col gap-0 self-stretch">
          <div className="relative h-full min-h-[20rem] sm:min-h-[32rem] overflow-hidden">
            <img
              src="/images/sunset-vending.png"
              alt="Sunset Vending Machine"
              className="w-full h-full object-contain object-center sm:object-right grayscale opacity-90"
            />
          </div>
        </div>

        {/* COL 3: Remix Now header + inventory counter + Break The Loop */}
        <div className="lg:col-span-7 flex flex-col gap-6">

          {/* Remix Now header */}
          <div className="border-l-2 border-white/50 pl-4">
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white leading-none mb-4">
              Remix<br />Now
            </h2>

            {/* Live Inventory Counter */}
            <div className="mb-8 w-fit">
              <span className="font-mono text-base sm:text-xl font-bold tracking-widest text-zinc-300 drop-shadow-md">
                <span className="text-2xl sm:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 via-orange-500 to-fuchsia-500 animate-[pulse_3s_ease-in-out_infinite] bg-[length:200%_auto]">
                  47
                </span> OF 100 RECORDS REMAINING
              </span>
            </div>

            {/* "Break The Loop" email capture box */}
            <div className="relative bg-gradient-to-br from-fuchsia-600 via-purple-600 to-orange-500 text-white p-4 sm:p-6 shadow-[8px_8px_0px_white] w-full sm:max-w-md overflow-hidden">
              {/* Grid / Dot Texture Overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJ मुआवजेKTI1NSwyNTUsMjU1LDAuMjUpIi8+PC9zdmc+')] opacity-40 z-0 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="font-mono text-[9px] uppercase tracking-widest mb-1 opacity-80">SP SOUNDPACK</div>
                <h3 className="font-black text-2xl uppercase leading-none tracking-tighter mb-2">Break<br />The Loop</h3>
                <div className="font-mono text-[9px] mb-4 uppercase tracking-widest text-fuchsia-200">VOL.1 // REMIX EDITION</div>
                <AnimatePresence mode="wait">
                  {vendState === "won" && prize && (
                    <motion.div
                      key="winner"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 18, mass: 0.8 }}
                      className={`text-center py-6 px-4 rounded-sm border-2 ${prize.tier === 1
                        ? 'bg-yellow-400/20 border-yellow-400 shadow-[0_0_40px_rgba(250,204,21,0.5)]'
                        : prize.tier === 2
                          ? 'bg-purple-500/20 border-purple-400 shadow-[0_0_40px_rgba(168,85,247,0.5)]'
                          : 'bg-white/20 border-white shadow-[0_0_40px_rgba(255,255,255,0.4)]'
                        }`}
                    >
                      <div className="font-mono text-[10px] uppercase tracking-widest mb-2 opacity-70">YOU WON</div>
                      <div className="font-black text-3xl uppercase tracking-tighter leading-none">{prize.label}</div>
                      <div className="font-mono text-[10px] mt-3 uppercase tracking-widest opacity-60">Tier {prize.tier} Prize</div>
                    </motion.div>
                  )}

                  {vendState === "already" && (
                    <motion.div
                      key="already"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-4"
                    >
                      <div className="font-mono text-sm text-fuchsia-200">
                        You've already claimed your {prize?.label ?? 'prize'}!
                      </div>
                    </motion.div>
                  )}

                  {vendState === "error" && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-2"
                    >
                      <div className="font-mono text-xs text-red-400 mb-2">Something went wrong. Try again.</div>
                      <button
                        onClick={() => setVendState("idle")}
                        className="w-full bg-white text-black font-mono font-bold text-xs uppercase py-2 border-2 border-white hover:bg-black hover:text-white transition-colors"
                      >
                        Retry
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {vendState !== "won" && vendState !== "already" && vendState !== "error" && (
                  <div className="mt-2">
                    <input
                      type="email"
                      placeholder="YOUR EMAIL"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleVend()}
                      disabled={vendState === "loading"}
                      className="w-full bg-black/40 text-white font-mono text-xs px-3 py-2 mb-2 border border-white/30 placeholder:text-white/60 outline-none focus:border-white transition-colors disabled:opacity-50"
                    />
                    <button
                      onClick={handleVend}
                      disabled={vendState === "loading" || !email.trim()}
                      className="w-full bg-white text-black font-mono font-bold text-xs uppercase py-2 hover:bg-black hover:text-white transition-colors border-2 border-white hover:border-black disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {vendState === "loading" ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="animate-spin inline-block w-3 h-3 border-2 border-black border-t-transparent rounded-full"></span>
                          PROCESSING...
                        </span>
                      ) : (
                        "Claim Your Copy"
                      )}
                    </button>
                  </div>
                )}
              </div>
              <div className="mt-3 text-center">
                <p className="font-mono text-[8px] sm:text-[9px] text-white/50 leading-tight">
                  NO PURCHASE NECESSARY. A purchase will not improve your chances. <br className="hidden sm:block" /> Void where prohibited. See Official Rules for odds & details.
                </p>
              </div>
            </div>

            <div className="font-mono text-[9px] text-neutral-400 grid grid-cols-2 gap-4 max-w-sm mt-6">
              <p>01 // DOWNLOAD STEMS<br />Format: WAV 24bit<br />Size: 2.4GB</p>
              <p>02 // SUBMIT TRACK<br />Deadline: 14.10.24<br />BPM: 128-140</p>
              <p>03 // WIN HARDWARE<br />Prize: Analog Heat<br />+2yr Subscription</p>
              <p>04 // JUDGING<br />By: Dave Clarke<br />Criteria: Innovation</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
