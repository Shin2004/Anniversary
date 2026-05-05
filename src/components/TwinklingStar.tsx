import React from 'react';
import { motion } from 'motion/react';
import { TwinklingStarProps } from '../types';

export const TwinklingStar = ({ delay = 0, x = '50%', y = '50%' }: TwinklingStarProps) => (
  <motion.div
    initial={{ opacity: 0.1 }}
    animate={{ opacity: [0.1, 0.8, 0.1] }}
    transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay }}
    className="absolute w-1 h-1 bg-white rounded-full blur-[0.5px] z-0"
    style={{ left: x, top: y }}
  />
);
