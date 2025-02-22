import React from 'react';
import { useGame } from '../../context/GameContext';
import './GameButtons.css';

export function GameButtons() {
  const { level, triedButtons, handleButtonClick } = useGame();
  const nBOfButtons = level + 1;

  return (
    <div className="buttons-grid">
      {Array.from({ length: nBOfButtons }).map((_, index) => (
        <button
          key={index}
          onClick={() => handleButtonClick(index)}
          disabled={triedButtons.includes(index)}
          className="game-button"
        >
          ?
        </button>
      ))}
    </div>
  );
}