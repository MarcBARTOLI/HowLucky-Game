import { useState, useCallback, useMemo, useEffect } from 'react';
import { GAME_CONFIG, STORAGE_KEYS } from '../config/gameConfig';
import { StorageService } from '../services/storage';
import type { GameState, GameStats, GameActions } from '../types/game';

function generateWinningButton(buttons: number): number {
  return Math.floor(Math.random() * buttons);
}

export function useGameLogic(): GameState & GameStats & GameActions {
  const [state, setState] = useState<GameState>({
    level: GAME_CONFIG.INITIAL_LEVEL,
    lives: GAME_CONFIG.INITIAL_LIVES,
    gameOver: false,
    triedButtons: [],
    highScore: StorageService.get(STORAGE_KEYS.HIGH_SCORE, 0),
    isLevelingUp: false,
  });

  const { level, gameOver, triedButtons, highScore } = state;

  // Calculate game statistics
  const nBOfButtons = level + GAME_CONFIG.BUTTONS_PER_LEVEL;
  const winningButton = useMemo(
    () => generateWinningButton(nBOfButtons),
    [nBOfButtons]
  );
  const remainingButtons = nBOfButtons - triedButtons.length;
  const probability = ((1 / remainingButtons) * 100).toFixed(1);

  // Update high score in storage
  useEffect(() => {
    if (gameOver && level > highScore) {
      setState(prev => ({ ...prev, highScore: level }));
      StorageService.set(STORAGE_KEYS.HIGH_SCORE, level);
    }
  }, [gameOver, level, highScore]);

  const handleButtonClick = useCallback(
    (index: number) => {
      if (index === winningButton) {
        setState(prev => ({
          ...prev,
          level: prev.level + 1,
          lives: prev.lives + GAME_CONFIG.LIVES_PER_WIN,
          isLevelingUp: true,
          triedButtons: [], // Reset tried buttons for new level
        }));
      } else {
        setState(prev => {
          const newLives = prev.lives - 1;
          return {
            ...prev,
            lives: newLives,
            gameOver: newLives < 0,
            triedButtons: [...prev.triedButtons, index],
          };
        });
      }
    },
    [winningButton]
  );

  const resetGame = useCallback(() => {
    setState({
      level: GAME_CONFIG.INITIAL_LEVEL,
      lives: GAME_CONFIG.INITIAL_LIVES,
      gameOver: false,
      triedButtons: [],
      highScore: state.highScore, // Preserve high score
      isLevelingUp: false,
    });
  }, [state.highScore]);

  const resetLevelUpAnimation = useCallback(() => {
    setState(prev => ({ ...prev, isLevelingUp: false }));
  }, []);

  return {
    ...state,
    nBOfButtons,
    winningButton,
    probability,
    handleButtonClick,
    resetGame,
    resetLevelUpAnimation,
  };
}