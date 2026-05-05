import React from 'react';
import { motion } from 'motion/react';

interface StorySectionProps {
  daysOfDevotion: number;
}

export const StorySection = ({ daysOfDevotion }: StorySectionProps) => {
  return (
    <section className="relative z-10 py-40 border-y border-white/5 bg-white/[0.02] backdrop-blur-3xl">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-accent-red/20 rounded-full blur-[100px] opacity-30" />
            <div className="relative aspect-[4/5] rounded-[0.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] border border-white/10 group">
              <img 
                src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1000" 
                alt="Romantic moments"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sleek-950/60 via-transparent to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-10"
          >
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-accent-gold/40" />
              <span className="font-mono text-accent-gold text-xs tracking-[0.5em] uppercase">The Story</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-white italic leading-tight">A Beautiful Journey</h2>
            <p className="text-pink-100/70 leading-relaxed text-xl font-light italic">
              "Dian, kau adalah melodi dalam keheninganku. Terima kasih telah menjadi rumah tempatku pulang. Setiap babak dalam kisah kita adalah mahakarya yang takkan pernah pudar. Cintaku padamu seperti samudera yang tak bertepi."
            </p>
            <div className="grid grid-cols-2 gap-12 pt-10">
              <div className="space-y-3">
                <div className="text-5xl font-serif text-accent-gold">{daysOfDevotion}+</div>
                <div className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">Days of Devotion</div>
              </div>
              <div className="space-y-3">
                <div className="text-5xl font-serif text-accent-gold">∞</div>
                <div className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">Eternal Promises</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
