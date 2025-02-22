import React, { useState } from 'react';
import { LevelBadge } from './components/LevelBadge/LevelBadge';
import { LivesCounter } from './components/LivesCounter/LivesCounter';
import { GameRules } from './components/GameRules/GameRules';
import { GameOver } from './components/GameOver/GameOver';
import { GameButtons } from './components/GameButtons/GameButtons';
import { WinProbability } from './components/WinProbability/WinProbability';
import { GoogleAds } from './components/GoogleAds/GoogleAds';
import { GameTitle } from './components/GameTitle/GameTitle';
import { GameProvider, useGame } from './context/GameContext';
import { StorageService } from './services/storage';
import { STORAGE_KEYS } from './config/gameConfig';
import './App.css';

function GameContent() {
  const { gameOver } = useGame();
  const [showRules, setShowRules] = useState(() => {
    return !StorageService.get(STORAGE_KEYS.RULES_SHOWN, false);
  });

  return (
    <>
      <GoogleAds />
      <GameTitle />
      <div className="container">
        <div className="game-card">
          {gameOver ? (
            <GameOver />
          ) : (
            <>
              <div className="header">
                <LevelBadge />
                <LivesCounter />
              </div>

              {showRules && <GameRules onClose={() => setShowRules(false)} />}

              <WinProbability />

              <GameButtons />

              <p className="hint">
                Find the correct button to advance to the next level!
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}