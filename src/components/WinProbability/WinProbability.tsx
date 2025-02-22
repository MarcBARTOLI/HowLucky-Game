import React from 'react';
import { useGame } from '../../context/GameContext';
import './WinProbability.css';

export function WinProbability() {
  const { probability } = useGame();

  return (
    <div className="probability">
      Win probability: {probability}%
    </div>
  );
}