import React, { createContext, useContext } from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import type { GameContextType } from '../types/game';

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const gameLogic = useGameLogic();
  return <GameContext.Provider value={gameLogic}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}