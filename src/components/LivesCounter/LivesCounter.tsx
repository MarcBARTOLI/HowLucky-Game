import React from 'react';
import { Heart } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import './LivesCounter.css';

export function LivesCounter() {
  const { lives, isLevelingUp, resetLevelUpAnimation } = useGame();

  return (
    <div className="lives-container">
      {isLevelingUp && (
        <div
          className="life-gain-notification"
          onAnimationEnd={resetLevelUpAnimation}
        >
          +1
        </div>
      )}
      <div className="lives">
        <Heart size={24} color="#E74C3C" />
        <span className="lives-count">{lives}</span>
      </div>
    </div>
  );
}