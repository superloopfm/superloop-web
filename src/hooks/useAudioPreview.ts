import { useState, useRef, useCallback } from 'react';

interface UseAudioPreviewReturn {
  currentTrack: string | null;
  isPlaying: boolean;
  progress: number;
  play: (src: string) => void;
  stop: () => void;
}

export function useAudioPreview(): UseAudioPreviewReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    cancelAnimationFrame(rafRef.current);
    setCurrentTrack(null);
    setIsPlaying(false);
    setProgress(0);
  }, []);

  const updateProgress = useCallback(() => {
    if (audioRef.current) {
      const pct = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(isNaN(pct) ? 0 : pct);
      rafRef.current = requestAnimationFrame(updateProgress);
    }
  }, []);

  const play = useCallback((src: string) => {
    // If same track, toggle pause/play
    if (currentTrack === src && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        cancelAnimationFrame(rafRef.current);
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        rafRef.current = requestAnimationFrame(updateProgress);
        setIsPlaying(true);
      }
      return;
    }

    // Stop current track
    stop();

    // Play new track
    const audio = new Audio(src);
    audio.loop = true;
    audioRef.current = audio;
    setCurrentTrack(src);
    setIsPlaying(true);

    audio.play().catch(() => {
      // Autoplay blocked — user interaction required
      setIsPlaying(false);
    });

    rafRef.current = requestAnimationFrame(updateProgress);

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setProgress(0);
    });
  }, [currentTrack, isPlaying, stop, updateProgress]);

  return { currentTrack, isPlaying, progress, play, stop };
}
