import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface WelcomeOverlayProps {
  hasStarted: boolean;
  onStart: () => void;
}

export const WelcomeOverlay = ({ hasStarted, onStart }: WelcomeOverlayProps) => {
  if (hasStarted) return null;

  return (
    <motion.div
      key="start-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-sleek-950 px-6 text-center"
    >
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          filter: ['drop-shadow(0 0 20px rgba(255,62,62,0.3))', 'drop-shadow(0 0 40px rgba(255,62,62,0.6))', 'drop-shadow(0 0 20px rgba(255,62,62,0.3))']
        }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mb-12"
      >
        <Heart fill="#ff3e3e" className="text-accent-red" size={100} />
      </motion.div>
      
      <h1 className="text-4xl md:text-6xl font-serif text-white italic mb-4">Untuk Dian Anastasia</h1>
      <p className="text-white/60 font-mono tracking-widest text-xs uppercase mb-12">Siapkan Hatimu Untuk Kejutan Ini</p>
      
      <button
        onClick={onStart}
        className="bg-accent-gold text-sleek-950 px-16 py-5 rounded-full text-lg font-bold tracking-[0.3em] uppercase hover:bg-white transition-all cursor-pointer shadow-[0_0_50px_rgba(212,175,55,0.3)] group relative overflow-hidden"
      >
        <span className="relative z-10">Buka Sekarang</span>
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </button>
    </motion.div>
  );
};
