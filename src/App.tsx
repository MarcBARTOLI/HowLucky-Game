import { useState, useEffect, useCallback, useMemo } from 'react';
import { LevelBadge } from './components/LevelBadge/LevelBadge';
import { LivesCounter } from './components/LivesCounter/LivesCounter';
import { GameRules } from './components/GameRules/GameRules';
import { GameOver } from './components/GameOver/GameOver';
import { GameButtons } from './components/GameButtons/GameButtons';
import { WinProbability } from './components/WinProbability/WinProbability';
import { GoogleAds } from './components/GoogleAds/GoogleAds';
import './App.css';

function generateWinningButton(buttons: number) {
  return Math.floor(Math.random() * buttons);
}

export default function App() {
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [triedButtons, setTriedButtons] = useState<number[]>([]);
  const [triggerShowLifeGain, setTriggerLifeGain] = useState(false);
  const [triggerShowLevelUp, setTriggerLevelUp] = useState(false);
  const [showRules, setShowRules] = useState(() => {
    return !localStorage.getItem('rulesShown');
  });
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('highScore');
    return saved ? parseInt(saved, 10) : 0;
  });

  const nBOfButtons = level + 1;

  const winningButton = useMemo(
    () => generateWinningButton(nBOfButtons),
    [nBOfButtons]
  );

  const remainingButtons = nBOfButtons - triedButtons.length;
  const probability = ((1 / remainingButtons) * 100).toFixed(1);

  useEffect(() => {
    if (!showRules) {
      localStorage.setItem('rulesShown', 'true');
    }
  }, [showRules]);

  useEffect(() => {
    if (gameOver && level > highScore) {
      setHighScore(level);
      localStorage.setItem('highScore', level.toString());
    }
  }, [gameOver, level, highScore]);

  const handleButtonClick = useCallback(
    (index: number) => {
      if (index === winningButton) {
        setLevel((prev) => prev + 1);
        setLives((prev) => prev + 1);
        setTriggerLevelUp(true);
        setTriggerLifeGain(true);
        setTriedButtons([]); // Reset tried buttons for new level
      } else {
        setTriedButtons((prev) => [...prev, index]);
        if (lives > 0) {
          setLives((prev) => prev - 1);
        } else {
          setGameOver(true);
        }
      }
    },
    [winningButton, lives]
  );

  const resetGame = useCallback(() => {
    setLevel(1);
    setLives(1);
    setGameOver(false);
    setTriedButtons([]);
  }, []);

  const handleLevelUpAnimationEnd = () => {
    setTriggerLevelUp(false);
  };

  const handleLifeGainAnimationEnd = () => {
    setTriggerLifeGain(false);
  };

  return (
    <>
      <GoogleAds />
      <div className="container">
        <div className="game-card">
          {gameOver ? (
            <GameOver
              level={level}
              highScore={highScore}
              onRestart={resetGame}
            />
          ) : (
            <>
              <div className="header">
                <LevelBadge
                  level={level}
                  triggerShowLevelUp={triggerShowLevelUp}
                  onLevelUpAnimationEnd={handleLevelUpAnimationEnd}
                />
                <LivesCounter
                  lives={lives}
                  triggerShowLifeGain={triggerShowLifeGain}
                  onLifeGainAnimationEnd={handleLifeGainAnimationEnd}
                />
              </div>

              {showRules && <GameRules onClose={() => setShowRules(false)} />}

              <WinProbability probability={probability} />

              <GameButtons
                nBOfButtons={nBOfButtons}
                triedButtons={triedButtons}
                onButtonClick={handleButtonClick}
              />

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
