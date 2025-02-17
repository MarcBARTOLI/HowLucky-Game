import { useState, useEffect } from 'react';
import { Crown } from 'lucide-react';
import './LevelBadge.css';

interface LevelBadgeProps {
  level: number;
  triggerShowLevelUp: boolean;
  onLevelUpAnimationEnd: () => void;
}

export function LevelBadge({
   level,
    triggerShowLevelUp,
    onLevelUpAnimationEnd,
 }: LevelBadgeProps) {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (triggerShowLevelUp) {
      setAnimationClass('level-up');
    }
    else {
      setAnimationClass('');
    }
  }, [triggerShowLevelUp]);

  return (
    <div
      className={`level-badge ${animationClass}`}
      onAnimationEnd={onLevelUpAnimationEnd}
      >
      <Crown size={24} className="crown-icon" />
      <div className="level-content">
        <span className="level-label">Level</span>
        <span className="level-number">{level}</span>
      </div>
    </div>
  );
}
