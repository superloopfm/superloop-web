import { useScarcityCounter } from '../../hooks/useScarcityCounter';
import { TOTAL_FOUNDERS } from '../../lib/constants';

export function ScarcityCounter() {
  const { remaining, loading } = useScarcityCounter();

  if (remaining <= 0) {
    return (
      <div className="font-mono text-2xl md:text-3xl font-bold text-white tracking-wider">
        SOLD OUT
      </div>
    );
  }

  return (
    <div className="font-mono text-2xl md:text-3xl font-bold text-white tracking-wider">
      {loading ? '—' : remaining} OF {TOTAL_FOUNDERS} REMAINING
    </div>
  );
}
