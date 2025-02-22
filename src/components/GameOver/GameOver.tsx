import React from 'react';
import { Trophy } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import './GameOver.css';

export function GameOver() {
  const { level, highScore, resetGame } = useGame();

  return (
    <div className="game-over">
      <h1 className="game-over-title">Game Over!</h1>
      <div className="game-over-content">
        <p className="game-over-score">
          You reached level {level}
        </p>
        <div className="best-score-badge">
          <Trophy size={24} className="trophy-icon" />
          <div className="score-content">
            <span className="score-label">Best Score</span>
            <span className="score-number">{highScore}</span>
          </div>
        </div>
        <button onClick={resetGame} className="restart-button">
          Play Again
        </button>
      </div>
    </div>
  );
}