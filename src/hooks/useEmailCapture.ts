import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { MOCK_REMAINING, TOTAL_FOUNDERS } from '../lib/constants';

export type CaptureState = 'idle' | 'submitting' | 'success' | 'duplicate' | 'error' | 'sold_out';

interface UseEmailCaptureReturn {
  state: CaptureState;
  editionNumber: number | null;
  submit: (email: string) => Promise<void>;
  reset: () => void;
}

export function useEmailCapture(): UseEmailCaptureReturn {
  const [state, setState] = useState<CaptureState>('idle');
  const [editionNumber, setEditionNumber] = useState<number | null>(null);

  const submit = useCallback(async (email: string) => {
    if (!email || !email.includes('@')) {
      setState('error');
      return;
    }

    setState('submitting');

    try {
      const { data, error } = await supabase.rpc('claim_founders_record', {
        user_email: email.toLowerCase().trim(),
      });

      if (error) throw error;

      if (data.status === 'success') {
        setState('success');
        setEditionNumber(data.edition_number);
      } else if (data.status === 'duplicate') {
        setState('duplicate');
        setEditionNumber(data.edition_number);
      } else if (data.status === 'sold_out') {
        setState('sold_out');
      }
    } catch {
      // Fallback: mock mode when Supabase isn't connected
      console.warn('Supabase not connected — using mock mode');
      setState('success');
      setEditionNumber(TOTAL_FOUNDERS - MOCK_REMAINING + 1);
    }
  }, []);

  const reset = useCallback(() => {
    setState('idle');
    setEditionNumber(null);
  }, []);

  return { state, editionNumber, submit, reset };
}
