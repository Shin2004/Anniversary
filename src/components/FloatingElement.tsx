import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { FloatingElementProps } from '../types';

export const FloatingElement = ({ delay = 0, x = '50%', type = 'heart', color, sizeMultiplier = 1 }: FloatingElementProps) => {
  const duration = 15 + Math.random() * 20;
  const baseSize = type === 'heart' ? 12 + Math.random() * 24 : 18 + Math.random() * 30;
  const size = baseSize * sizeMultiplier;
  
  const defaultColor = type === 'heart' ? 'text-accent-red/20' : 'text-pink-400/15';
  const colorClass = color || defaultColor;
  
  return (
    <motion.div
      initial={{ y: '110vh', x, opacity: 0, rotate: 0 }}
      animate={{ 
        y: '-20vh', 
        opacity: [0, 0.5, 0.5, 0],
        rotate: type === 'heart' ? [0, 180, 360] : [0, 90, 180, 270, 360],
        x: [x, `calc(${x} + ${60 + Math.random() * 80}px)`, `calc(${x} - ${30 + Math.random() * 40}px)`, x],
        scale: [1, 1.2, 1]
      }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        delay, 
        ease: "linear" 
      }}
      className={`fixed pointer-events-none z-0 ${colorClass}`}
      style={{ fontSize: size }}
    >
      {type === 'heart' ? (
        <Heart fill="currentColor" stroke="none" />
      ) : (
        <div className="w-4 h-6 bg-current rounded-full blur-[1.5px] rotate-45 transform-gpu opacity-40 shadow-[0_0_10px_currentColor]" />
      )}
    </motion.div>
  );
};
