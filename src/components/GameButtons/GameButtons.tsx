import React from 'react';
import './GameButtons.css';

interface GameButtonsProps {
  nBOfButtons: number;
  triedButtons: number[];
  onButtonClick: (index: number) => void;
}

export function GameButtons({
  nBOfButtons,
  triedButtons,
  onButtonClick,
}: GameButtonsProps) {
  return (
    <div className="buttons-grid">
      {Array.from({ length: nBOfButtons }).map((_, index) => (
        <button
          key={index}
          onClick={() => onButtonClick(index)}
          disabled={triedButtons.includes(index)}
          className="game-button"
        >
          ?
        </button>
      ))}
    </div>
  );
}
