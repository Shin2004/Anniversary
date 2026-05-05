import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative z-10 py-32 border-t border-white/5 text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-red/5 blur-[150px] opacity-30" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 space-y-12"
      >
          <div className="flex flex-col items-center gap-6">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="text-accent-red"
              >
                  <Heart fill="currentColor" size={40} />
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-script text-accent-gold">Forever & Always</h2>
              <p className="text-xs tracking-[0.4em] text-white/20 uppercase font-light">Dian Anastasia</p>
          </div>
          <div className="pt-16 text-[10px] font-mono text-white/10 tracking-widest uppercase">
              EST 2024
          </div>
      </motion.div>
    </footer>
  );
};
