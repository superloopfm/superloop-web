import { useState } from 'react';
import { useEmailCapture } from '../../hooks/useEmailCapture';
import { ScarcityCounter } from './ScarcityCounter';

interface EmailCaptureBarProps {
  className?: string;
}

export function EmailCaptureBar({ className = '' }: EmailCaptureBarProps) {
  const [email, setEmail] = useState('');
  const { state, editionNumber, submit } = useEmailCapture();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(email);
  };

  if (state === 'success') {
    return (
      <div className={`w-full border-t-2 border-white/20 bg-brand-darker py-10 px-6 text-center ${className}`}>
        <div className="font-display text-3xl md:text-4xl text-white tracking-wider mb-2">
          PACK CLAIMED.
        </div>
        <div className="font-mono text-white text-lg">
          YOU'RE FOUNDER #{String(editionNumber).padStart(3, '0')}.
        </div>
      </div>
    );
  }

  if (state === 'duplicate') {
    return (
      <div className={`w-full border-t-2 border-white/20 bg-brand-darker py-10 px-6 text-center ${className}`}>
        <div className="font-mono text-xl text-white/80">
          YOU'VE ALREADY CLAIMED YOUR PACK.
        </div>
        {editionNumber && (
          <div className="font-mono text-white text-sm mt-2">
            FOUNDER #{String(editionNumber).padStart(3, '0')}
          </div>
        )}
      </div>
    );
  }

  if (state === 'sold_out') {
    return (
      <div className={`w-full border-t-2 border-white/20 bg-brand-darker py-10 px-6 text-center ${className}`}>
        <div className="font-display text-3xl text-white">SOLD OUT</div>
        <div className="font-mono text-sm text-white/50 mt-2">ALL 100 FOUNDERS EDITIONS HAVE BEEN CLAIMED.</div>
      </div>
    );
  }

  return (
    <div className={`w-full border-t-2 border-white/20 bg-brand-darker py-10 px-6 ${className}`}>
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
        <ScarcityCounter />

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="YOUR EMAIL"
            className="flex-1 bg-black border-2 border-white/20 text-white font-mono text-sm px-4 py-3 placeholder:text-white/30 focus:border-white/40 focus:outline-none transition-colors"
            required
          />
          <button
            type="submit"
            disabled={state === 'submitting'}
            className="bg-white text-black font-mono font-bold text-sm uppercase tracking-wider px-6 py-3 hover:bg-white/80 hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {state === 'submitting' ? 'CLAIMING...' : 'CLAIM YOUR PACK'}
          </button>
        </form>

        {state === 'error' && (
          <div className="font-mono text-sm text-red-400">SOMETHING WENT WRONG. TRY AGAIN.</div>
        )}

        <div className="font-mono text-xs text-white/30 tracking-wider">
          FREE. INSTANT ACCESS. NO CREDIT CARD.
        </div>
      </div>
    </div>
  );
}
