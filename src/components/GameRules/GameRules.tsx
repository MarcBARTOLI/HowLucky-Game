import React from 'react';
import { Info } from 'lucide-react';
import { StorageService } from '../../services/storage';
import { STORAGE_KEYS } from '../../config/gameConfig';
import './GameRules.css';

interface GameRulesProps {
  onClose: () => void;
}

export function GameRules({ onClose }: GameRulesProps) {
  React.useEffect(() => {
    StorageService.set(STORAGE_KEYS.RULES_SHOWN, true);
  }, []);

  return (
    <div className="rules">
      <div className="rules-header">
        <Info size={20} />
        <h2>How to Play</h2>
      </div>
      <ul>
        <li>Find the correct button to advance to the next level</li>
        <li>Each correct guess gives you an extra life</li>
        <li>Wrong guesses cost one life</li>
        <li>The number of buttons increases with each level</li>
      </ul>
      <button className="close-rules" onClick={onClose}>
        Got it!
      </button>
    </div>
  );
}