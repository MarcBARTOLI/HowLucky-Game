import React, { useEffect, useState } from 'react';
import { Crown } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import './LevelBadge.css';

export function LevelBadge() {
  const [animationClass, setAnimationClass] = useState('');
  const { level, isLevelingUp, resetLevelUpAnimation } = useGame();

  useEffect(() => {
    if (isLevelingUp) {
      setAnimationClass('level-up');
    } else {
      setAnimationClass('');
    }
  }, [isLevelingUp]);

  return (
    <div
      className={`level-badge ${animationClass}`}
      onAnimationEnd={resetLevelUpAnimation}
    >
      <Crown size={24} className="crown-icon" />
      <div className="level-content">
        <span className="level-label">Level</span>
        <span className="level-number">{level}</span>
      </div>
    </div>
  );
}