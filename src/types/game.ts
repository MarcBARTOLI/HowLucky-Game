export interface GameState {
  level: number;
  lives: number;
  gameOver: boolean;
  triedButtons: number[];
  highScore: number;
  isLevelingUp: boolean;
}

export interface GameActions {
  handleButtonClick: (index: number) => void;
  resetGame: () => void;
  resetLevelUpAnimation: () => void;
}

export interface GameStats {
  probability: string;
  nBOfButtons: number;
  winningButton: number;
}

export type GameContextType = GameState & GameActions & GameStats;