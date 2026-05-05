import React from 'react';

export interface FloatingElementProps {
  delay?: number;
  x?: string;
  type?: 'heart' | 'petal';
  color?: string;
  sizeMultiplier?: number;
  key?: React.Key;
}

export interface TwinklingStarProps {
  delay?: number;
  x?: string;
  y?: string;
  key?: React.Key;
}
