import React from 'react';
import { FloatingElement } from './FloatingElement';
import { TwinklingStar } from './TwinklingStar';

interface RomanticDecorationsProps {
  hearts: any[];
  petals: any[];
  stars: any[];
}

export const RomanticDecorations = ({ hearts, petals, stars }: RomanticDecorationsProps) => {
  return (
    <>
      <div className="sleek-glow-1" />
      <div className="sleek-glow-2" />
      
      <div className="fixed inset-0 pointer-events-none">
        {stars.map((s, i) => (
          <TwinklingStar key={`star-${i}`} delay={s.delay} x={s.x} y={s.y} />
        ))}
      </div>

      <div className="fixed top-12 left-12 z-0 hidden md:block">
        <div className="w-16 h-16 border-t border-l border-accent-gold/40"></div>
      </div>
      <div className="fixed bottom-12 right-12 z-0 hidden md:block">
        <div className="w-16 h-16 border-b border-r border-accent-gold/40"></div>
      </div>

      {hearts.map((h, i) => (
        <FloatingElement key={`heart-${i}`} delay={h.delay} x={h.x} type="heart" color={h.color} sizeMultiplier={h.sizeMultiplier} />
      ))}
      {petals.map((p, i) => (
        <FloatingElement key={`petal-${i}`} delay={p.delay} x={p.x} type="petal" sizeMultiplier={p.sizeMultiplier} />
      ))}
    </>
  );
};
