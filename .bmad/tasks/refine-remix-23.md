# STRATEGIC UI RESTRUCTURE: ITERATION 23 (LEGAL & TOS)
**Role**: Expert Frontend Developer (Compliance & Footer Structure)

## Context
Per BMed's strategy, because this Vending Machine operates as a game of chance involving a physical prize for an email entry, we are legally required to inject specific Sweepstakes clauses and links into the footer to avoid federal postal lottery violations.

## Assignment
Execute the following targeted UI updates within `src/App.tsx`:

### 1. "No Purchase Necessary" Disclaimer
- Locate the "Break The Loop" email capture form inside `Block 3` (around line ~446, adjacent to the `Claim Your Copy` button).
- Directly beneath the button, but still inside the `bg-gradient-to-br` container, inject this micro-copy:
  ```tsx
  <div className="mt-3 text-center">
    <p className="font-mono text-[8px] sm:text-[9px] text-white/50 leading-tight">
      NO PURCHASE NECESSARY. A purchase will not improve your chances. <br className="hidden sm:block" /> Void where prohibited. See Official Rules for odds & details.
    </p>
  </div>
  ```

### 2. Overhaul the Footer `<footer>`
- Locate the global `<footer>` situated at the very bottom of the page (e.g., `<footer className="border-t border-zinc-800 p-6 ...">`). 
- Replace its contents entirely with this expanded legal layout:
  ```tsx
  <footer className="border-t border-zinc-900 bg-black text-zinc-500 py-12 px-6">
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Footer Left - Links */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 font-mono text-xs text-center md:text-left">
        <a href="#privacy" className="hover:text-white transition-colors uppercase tracking-wider">Privacy Policy</a>
        <a href="#terms" className="hover:text-white transition-colors uppercase tracking-wider">Terms & Conditions</a>
        <a href="#rules" className="hover:text-white transition-colors uppercase tracking-wider text-fuchsia-500">Official Sweepstakes Rules</a>
      </div>
      
      {/* Footer Right - Legal Copy */}
      <div className="text-center md:text-right font-mono text-[9px] sm:text-[10px] space-y-2">
        <p>No purchase necessary to enter or win. Void where prohibited by law.</p>
        <p>Open to legal US residents 18+. See Official Rules for full prize tier details and ARV.</p>
        <p className="mt-4 text-zinc-600">© 2026 SUPERLOOP. ALL RIGHTS RESERVED.</p>
      </div>
    </div>
  </footer>
  ```

Execute these specific legal additions cleanly. Ensure 0 TypeScript errors. Output standard confirmation.
