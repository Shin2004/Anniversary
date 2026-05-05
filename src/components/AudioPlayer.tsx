import React, { useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import { motion } from 'motion/react';

interface AudioPlayerProps {
  isPlaying: boolean;
  hasStarted: boolean;
  onToggle: () => void;
}

export const AudioPlayer = forwardRef<HTMLAudioElement, AudioPlayerProps>(
  ({ isPlaying, hasStarted, onToggle }, ref) => {
    const [audioError, setAudioError] = useState(false);
    const audioInternalRef = React.useRef<HTMLAudioElement | null>(null);

    useImperativeHandle(ref, () => audioInternalRef.current!);

    useEffect(() => {
      const activeAudio = audioInternalRef.current;
      if (activeAudio && hasStarted) {
        if (isPlaying) {
          activeAudio.play().catch(() => console.log("Playback failed or blocked"));
        } else {
          activeAudio.pause();
        }
      }
    }, [isPlaying, hasStarted]);

    useEffect(() => {
      const unlockAudio = () => {
        const activeAudio = audioInternalRef.current;
        if (activeAudio && hasStarted && isPlaying) {
          activeAudio.play().catch(() => {});
        }
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
      };

      window.addEventListener('click', unlockAudio);
      window.addEventListener('touchstart', unlockAudio);

      return () => {
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
      };
    }, [hasStarted]);

    return (
      <>
        <audio 
          ref={audioInternalRef}
          loop
          src="/lagu.mp3" 
          onError={() => {
            console.warn("Lagu utama (lagu.mp3) tidak ditemukan.");
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 w-80 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4 group"
        >
          <button 
            onClick={onToggle}
            className="w-12 h-12 bg-accent-red/20 rounded-lg flex items-center justify-center cursor-pointer hover:bg-accent-red/30 transition-colors"
          >
            {isPlaying ? (
              <div className="flex gap-1 items-end h-4">
                <motion.div animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-accent-red" />
                <motion.div animate={{ height: [16, 8, 16] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-1 bg-accent-red" />
                <motion.div animate={{ height: [10, 14, 10] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-accent-red" />
              </div>
            ) : (
              <div className="w-0 h-0 border-t-6 border-t-transparent border-l-10 border-l-accent-red border-b-6 border-b-transparent ml-1"></div>
            )}
          </button>
          <div className="flex-1 overflow-hidden">
            <div className="relative h-4 flex items-center overflow-hidden">
              <motion.div 
                animate={isPlaying ? { x: ['0%', '-50%'] } : { x: '0%' }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="flex gap-8 whitespace-nowrap"
              >
                <span className="text-[10px] md:text-xs font-bold text-white/80 uppercase tracking-widest">
                  Nadhif Basalamah - Kota Ini Tak Sama Tanpamu
                </span>
                <span className="text-[10px] md:text-xs font-bold text-white/80 uppercase tracking-widest">
                  Nadhif Basalamah - Kota Ini Tak Sama Tanpamu
                </span>
              </motion.div>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
              <motion.div 
                animate={isPlaying ? { x: ['-100%', '100%'] } : { x: '0%' }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="h-full bg-accent-red w-1/3" 
              />
            </div>
          </div>
          <div className="text-[10px] text-white/40 font-mono">LIVE</div>
        </motion.div>
      </>
    );
  }
);
