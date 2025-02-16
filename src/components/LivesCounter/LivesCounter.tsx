import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import './LivesCounter.css';

interface LivesCounterProps {
  lives: number;
  triggerShowLifeGain: boolean;
}

export function LivesCounter({
  lives,
  triggerShowLifeGain,
}: LivesCounterProps) {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (triggerShowLifeGain) {
      setAnimationClass('life-gain-notification');
    }
  }, [triggerShowLifeGain]);

  const handleAnimationEnd = () => {
    setAnimationClass('');
  };

  return (
    <div className="lives-container">
      {triggerShowLifeGain && (
        <div
          className={`${animationClass}`}
          onAnimationEnd={handleAnimationEnd}
        >
          +1 Life!
        </div>
      )}
      <div className="lives">
        <Heart size={24} color="#E74C3C" />
        <span className="lives-count">{lives}</span>
      </div>
    </div>
  );
}
