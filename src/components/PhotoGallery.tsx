import React from 'react';
import { motion } from 'motion/react';
import { Camera, X, Sparkles } from 'lucide-react';

interface PhotoGalleryProps {
  photos: string[];
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
  onReset: () => void;
  onBurst: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  showResetConfirm: boolean;
  setShowResetConfirm: (show: boolean) => void;
}

export const PhotoGallery = ({
  photos,
  onUpload,
  onRemove,
  onReset,
  onBurst,
  fileInputRef,
  showResetConfirm,
  setShowResetConfirm
}: PhotoGalleryProps) => {
  return (
    <section className="relative z-10 py-32 border-t border-white/5">
      <div className="container mx-auto px-6 text-center space-y-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <Sparkles className="mx-auto text-accent-gold/40 mb-4" size={40} />
          <h2 className="text-4xl md:text-5xl font-serif text-white italic tracking-wide">Timeless Fragments</h2>
          <p className="text-white/40 tracking-[0.2em] text-xs uppercase">Tap to release love &bull; Upload your story below</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => fileInputRef.current?.click()}
            className="aspect-[3/4] bg-accent-gold/5 rounded-lg border border-accent-gold/20 flex flex-col items-center justify-center cursor-pointer group relative overflow-hidden"
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={onUpload}
            />
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-accent-gold"
            >
              <Camera size={40} strokeWidth={1.5} />
            </motion.div>
            <div className="mt-4 text-accent-gold/60 text-[10px] font-mono tracking-widest uppercase">Add Moment</div>
            <div className="absolute inset-0 bg-accent-gold/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>

          {photos.map((photo, i) => (
            <motion.div
              key={`photo-${i}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="aspect-[3/4] bg-white/5 rounded-lg border border-white/10 flex items-center justify-center cursor-pointer group overflow-hidden relative shadow-2xl"
            >
              <img 
                src={photo} 
                alt={`Memory ${i}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                onClick={onBurst}
              />
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(i);
                }}
                className="absolute top-2 right-2 bg-black/60 hover:bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all z-20 backdrop-blur-sm border border-white/10"
              >
                <X size={14} />
              </button>

              <div className="absolute inset-0 bg-accent-red/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="absolute bottom-4 left-4 text-left opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="text-accent-gold text-[8px] font-mono tracking-widest uppercase">Memory #{i + 1}</div>
              </div>
            </motion.div>
          ))}

          {photos.length < 3 && [1, 2, 3].slice(0, 3 - photos.length).map((i) => (
            <motion.div
              key={`placeholder-${i}`}
              className="aspect-[3/4] bg-white/5 rounded-lg border border-white/10 flex items-center justify-center group overflow-hidden relative opacity-30"
            >
              <div className="relative text-white/5 scale-150">
                <Camera size={140} strokeWidth={0.5} />
              </div>
            </motion.div>
          ))}
        </div>
        
        {photos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-16 flex flex-col items-center gap-6 relative z-[100]"
          >
            {!showResetConfirm ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowResetConfirm(true);
                }}
                className="bg-black/60 border border-red-500/50 text-red-500 hover:text-white hover:bg-red-600 px-12 py-4 rounded-full transition-all cursor-pointer font-mono text-sm tracking-[0.2em] uppercase flex items-center gap-3 backdrop-blur-xl shadow-2xl shadow-red-500/10 pointer-events-auto"
              >
                <X size={18} />
                Reset Galeri Foto
              </button>
            ) : (
              <div className="flex flex-col items-center gap-6 p-8 rounded-[2rem] bg-black/90 border border-red-500/40 backdrop-blur-2xl shadow-[0_0_80px_rgba(255,0,0,0.2)] animate-in zoom-in-95 pointer-events-auto relative z-[101]">
                <p className="text-red-400 text-sm font-mono tracking-[0.2em] uppercase font-bold px-4">Hapus semua kenangan abadimu?</p>
                <div className="flex gap-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onReset();
                    }}
                    className="bg-red-600 text-white px-10 py-3 rounded-full transition-all cursor-pointer font-mono text-sm tracking-widest uppercase font-bold hover:bg-red-700 shadow-lg shadow-red-600/30"
                  >
                    Ya, Hapus
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowResetConfirm(false);
                    }}
                    className="bg-white/10 text-white px-10 py-3 rounded-full transition-all cursor-pointer font-mono text-sm tracking-widest uppercase hover:bg-white/20"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};
