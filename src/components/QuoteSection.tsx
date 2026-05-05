import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export const QuoteSection = () => {
  return (
    <section className="relative z-10 py-48 text-center bg-sleek-950">
      <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
              <div className="text-accent-gold mb-12 opacity-20">
                  <Heart size={120} className="mx-auto" strokeWidth={0.2} />
              </div>
              <p className="text-3xl md:text-5xl font-serif text-white italic leading-[1.4]">
                  "Cinta bukan tentang mencari sosok sempurna, melainkan merayakan ketidaksempurnaan <span className="text-accent-red">bersama-sama</span>."
              </p>
              <div className="mt-16 flex items-center justify-center space-x-6">
                  <div className="h-px w-20 bg-accent-gold/20" />
                  <span className="font-script text-4xl text-accent-gold">Dian Anastasia</span>
                  <div className="h-px w-20 bg-accent-gold/20" />
              </div>
          </motion.div>
      </div>
    </section>
  );
};
