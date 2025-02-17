import { Heart } from 'lucide-react';
import './LivesCounter.css';

interface LivesCounterProps {
  lives: number;
  triggerShowLifeGain: boolean;
  onLifeGainAnimationEnd: () => void;
}

export function LivesCounter({
  lives,
  triggerShowLifeGain,
  onLifeGainAnimationEnd,
}: LivesCounterProps) {
  return (
    <div className="lives-container">
      {triggerShowLifeGain && (
        <div
          className="life-gain-notification"
          onAnimationEnd={onLifeGainAnimationEnd}
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