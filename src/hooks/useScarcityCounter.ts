import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MOCK_REMAINING, TOTAL_FOUNDERS } from '../lib/constants';

interface UseScarcityCounterReturn {
  remaining: number;
  loading: boolean;
}

export function useScarcityCounter(): UseScarcityCounterReturn {
  const [remaining, setRemaining] = useState<number>(MOCK_REMAINING);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCount() {
      try {
        const { count, error } = await supabase
          .from('founders_signups')
          .select('*', { count: 'exact', head: true });

        if (error) throw error;
        setRemaining(TOTAL_FOUNDERS - (count ?? 0));
      } catch {
        // Fallback to mock
        setRemaining(MOCK_REMAINING);
      } finally {
        setLoading(false);
      }
    }

    fetchCount();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('founders_signups_changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'founders_signups' }, () => {
        setRemaining(prev => Math.max(0, prev - 1));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { remaining, loading };
}
