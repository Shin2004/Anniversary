import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const TypewriterEffect = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setComplete(false);
    if (!text) return;

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setComplete(true);
      }
    }, 40); // 40ms per character for a smooth typing feel
    
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="relative min-h-[4rem] flex flex-col items-center justify-center">
      <p className="text-xl md:text-3xl font-serif text-pink-100 italic leading-relaxed text-center px-4 drop-shadow-[0_2px_10px_rgba(255,182,193,0.3)] select-none">
        {displayedText}
        {!complete && (
          <motion.span 
            animate={{ opacity: [0, 1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.8 }} 
            className="inline-block w-[2px] h-[1.2em] bg-accent-gold ml-1 translate-y-1 shadow-[0_0_8px_#d4af37]" 
          />
        )}
      </p>
    </div>
  );
};
