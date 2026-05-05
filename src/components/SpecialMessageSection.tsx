import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { TypewriterEffect } from './TypewriterEffect';

interface SpecialMessageSectionProps {
  specialMessage: string;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  messageRef: React.RefObject<HTMLDivElement | null>;
  onSave: (msg: string) => void;
  onCancel: () => void;
}

export const SpecialMessageSection = ({
  specialMessage,
  isEditing,
  setIsEditing,
  messageRef,
  onSave,
  onCancel,
}: SpecialMessageSectionProps) => {
  return (
    <section ref={messageRef} className="relative z-10 py-32 bg-sleek-900 border-t border-white/5">
      <div className="container mx-auto px-6 text-center">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="max-w-3xl mx-auto space-y-12"
          >
            <div className="space-y-4">
              <span className="text-accent-gold text-xs tracking-[0.4em] uppercase font-bold">Pesan Spesial</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white italic">Untuk Dian Anastasia</h2>
            </div>

            <div className="relative p-8 md:p-12 border border-accent-gold/20 rounded-3xl bg-white/[0.02] backdrop-blur-sm overflow-hidden min-h-[300px] flex items-center justify-center">
              <div className="absolute top-0 right-0 p-4">
                  <Heart className="text-accent-red/20" size={100} strokeWidth={0.5} />
              </div>
              
              {specialMessage && !isEditing ? (
                <div className="space-y-8 relative z-10 w-full">
                  <TypewriterEffect text={specialMessage} />
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: specialMessage.length * 0.04 + 0.5 }}
                  >
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="mt-8 text-accent-gold/40 hover:text-accent-gold transition-colors text-[10px] tracking-[0.4em] uppercase font-mono cursor-pointer"
                    >
                      [ Edit Message ]
                    </button>
                  </motion.div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full relative z-10"
                >
                  <textarea
                    defaultValue={specialMessage}
                    autoFocus
                    className="w-full bg-transparent border-none text-xl md:text-3xl font-serif text-pink-100 italic text-center focus:ring-0 placeholder:text-white/10 resize-none h-40"
                    placeholder="Tuliskan pesan cintamu di sini..."
                    id="message-input"
                  />
                  <div className="mt-8 flex justify-center gap-6">
                     <button 
                        onClick={() => {
                          const input = document.getElementById('message-input') as HTMLTextAreaElement;
                          if (input && input.value.trim()) {
                            onSave(input.value);
                          }
                        }}
                        className="bg-accent-gold text-sleek-950 px-8 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
                     >
                       Simpan Pesan
                     </button>
                     <button 
                        onClick={onCancel}
                        className="text-white/40 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest cursor-pointer"
                     >
                       Batal
                     </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
      </div>
    </section>
  );
};
