import React from 'react';
import { motion } from 'motion/react';
import { MessageSquareHeart, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onUnveil: () => void;
  onBurst: () => void;
}

export const HeroSection = ({ onUnveil, onBurst }: HeroSectionProps) => {
  return (
    <main className="relative z-10 container mx-auto px-6 pt-20 pb-32 flex flex-col items-center justify-center min-h-screen text-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3,
              delayChildren: 0.5
            }
          }
        }}
        className="space-y-8 flex flex-col items-center"
      >
        <motion.div 
          variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
          }}
          className="mb-6"
        >
          <span className="uppercase tracking-[0.5em] text-accent-gold text-sm font-medium opacity-80">Celebrating Our Love</span>
        </motion.div>

        <motion.h1 
          variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeOut" } }
          }}
          className="text-4xl md:text-8xl font-serif mb-8 flex flex-col md:flex-row items-center gap-4 md:gap-8"
        >
          <span className="text-white italic">Dian Anastasia</span>
        </motion.h1>

        <motion.div 
          variants={{
              hidden: { width: 0, opacity: 0 },
              visible: { width: 128, opacity: 0.4 }
          }}
          className="h-[1px] bg-accent-gold mb-8"
        ></motion.div>

        <motion.div 
          variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 0.9, y: 0 }
          }}
          className="max-w-xl px-4"
        >
           <p className="text-sm md:text-xl leading-relaxed text-pink-100 italic text-center">
              "Setiap detik bersamamu adalah sebuah anugerah yang tak ternilai. Terima kasih telah mengisi hari-hariku dengan kasih sayang yang tulus. Engkau adalah melodi terindah dalam simfoni hidupku."
           </p>
        </motion.div>

        <motion.div 
          variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
          }}
          className="mt-8 md:mt-12 flex items-center gap-4"
        >
          <div className="px-4 md:px-6 py-1 md:py-2 border border-accent-gold/30 rounded-full bg-accent-gold/10">
            <span className="text-accent-gold font-mono tracking-widest text-[10px] md:text-sm">EST 2024</span>
          </div>
        </motion.div>

        <motion.div 
          variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
          }}
          className="pt-16"
        >
          <button 
            onClick={() => {
              onUnveil();
              onBurst();
            }}
            className="bg-accent-red text-white px-12 py-4 rounded-full text-lg font-medium shadow-[0_0_40px_rgba(255,62,62,0.3)] hover:bg-red-600 transition-all cursor-pointer flex items-center space-x-3 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out skew-x-12" />
            <MessageSquareHeart size={20} className="group-hover:scale-125 transition-transform" />
            <span className="tracking-widest uppercase text-sm font-bold">Unveil Our Secret</span>
          </button>
        </motion.div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 text-accent-gold/40"
      >
        <ChevronDown size={32} />
      </motion.div>
    </main>
  );
};
