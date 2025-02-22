export const GAME_CONFIG = {
  INITIAL_LEVEL: 1,
  INITIAL_LIVES: 1,
  BUTTONS_PER_LEVEL: 1, // How many additional buttons per level
  LIVES_PER_WIN: 1, // How many lives gained per correct guess
} as const;

export const STORAGE_KEYS = {
  HIGH_SCORE: 'highScore',
  RULES_SHOWN: 'rulesShown',
} as const;