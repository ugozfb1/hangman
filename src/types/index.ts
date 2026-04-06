export type Difficulty = "easy" | "medium" | "hard" | "very_hard";

export interface WordEntry {
  word: string;
  hint: string;
}

export interface WordsData {
  easy: WordEntry[];
  medium: WordEntry[];
  hard: WordEntry[];
  very_hard: WordEntry[];
}

export interface GameState {
  currentWord: string;
  hint: string;
  difficulty: Difficulty;
  guessedChars: string[];
  incorrectGuesses: string[];
  maxLives: number;
  gameStatus: "idle" | "playing" | "won" | "lost";
}

export type GameAction =
  | { type: "START_GAME"; payload: { difficulty: Difficulty; word: string; hint: string } }
  | { type: "GUESS_CHAR"; payload: { char: string } }
  | { type: "RESTART_GAME" };
