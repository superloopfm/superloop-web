import { VALUE_ITEMS, VALUE_TOTAL, VALUE_PRICE } from '../../lib/constants';

export function ValueStackPanel() {
  return (
    <div className="bg-brand-dark border border-white/10 p-5 md:p-6">
      <h3 className="font-mono text-xs text-white/50 uppercase tracking-widest mb-4">
        WHAT FOUNDERS GET
      </h3>

      <div className="flex flex-col gap-3">
        {VALUE_ITEMS.map((item) => (
          <div key={item.label}>
            <div className="flex items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="text-white/60 font-mono text-xs shrink-0">&rarr;</span>
                <span className="font-mono text-xs font-bold text-white uppercase truncate">{item.label}</span>
              </div>
              <span className="font-mono text-xs text-white/60 shrink-0">{item.value}</span>
            </div>
            <div className="font-mono text-[10px] text-white/40 ml-5 mt-0.5">
              {item.desc}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/15 mt-5 pt-5">
        <div className="font-display text-2xl md:text-3xl text-white/60 tracking-wider">
          TOTAL VALUE: <span className="text-white">{VALUE_TOTAL}</span>
        </div>
        <div className="font-display text-4xl md:text-5xl text-white tracking-wider mt-1">
          YOUR PRICE: <span className="text-white">{VALUE_PRICE}</span>
        </div>
      </div>
    </div>
  );
}
