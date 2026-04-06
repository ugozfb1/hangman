import wordsData from "@/data/words.json";
import type { Difficulty, WordEntry, WordsData } from "@/types";

const typedWordsData = wordsData as WordsData;

const CHAR_PATTERN = /^[A-Z0-9]$/;
const FALLBACK_ENTRY: WordEntry = {
  word: "BASEAPP",
  hint: "Fallback crypto word used when category data is unavailable.",
};

export function getRandomWord(difficulty: Difficulty): WordEntry {
  const categoryWords = typedWordsData[difficulty];

  if (!categoryWords || categoryWords.length === 0) {
    return FALLBACK_ENTRY;
  }

  const randomIndex = Math.floor(Math.random() * categoryWords.length);
  const selected = categoryWords[randomIndex];

  if (!selected?.word || !selected?.hint) {
    return FALLBACK_ENTRY;
  }

  return selected;
}

export function normalizeChar(char: string): string | null {
  if (!char) return null;

  const upperChar = char.toUpperCase();
  return CHAR_PATTERN.test(upperChar) ? upperChar : null;
}

export function checkWin(currentWord: string, guessedChars: string[]): boolean {
  const uniqueChars = Array.from(new Set(currentWord.split("")));
  return uniqueChars.every((char) => guessedChars.includes(char));
}
