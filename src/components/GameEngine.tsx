"use client";

import { useCallback, useEffect, useReducer, useState } from "react";
import { GameStatus } from "@/components/GameStatus";
import { HangmanDrawing } from "@/components/HangmanDrawing";
import { Keyboard } from "@/components/Keyboard";
import { WordDisplay } from "@/components/WordDisplay";
import { LoseScreen } from "@/components/screens/LoseScreen";
import { StartScreen } from "@/components/screens/StartScreen";
import { WinScreen } from "@/components/screens/WinScreen";
import type { Difficulty, GameAction, GameState } from "@/types";
import { checkWin, getRandomWord, normalizeChar } from "@/utils/gameUtils";
import sdk from "@farcaster/frame-sdk";


const MAX_LIVES = 6;

const initialState: GameState = {
  currentWord: "",
  hint: "",
  difficulty: "easy",
  guessedChars: [],
  incorrectGuesses: [],
  maxLives: MAX_LIVES,
  gameStatus: "idle",
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        currentWord: action.payload.word,
        hint: action.payload.hint,
        difficulty: action.payload.difficulty,
        guessedChars: [],
        incorrectGuesses: [],
        gameStatus: "playing",
      };

    case "GUESS_CHAR": {
      if (state.gameStatus !== "playing") return state;

      const { char } = action.payload;
      const normalized = normalizeChar(char);

      if (!normalized || state.guessedChars.includes(normalized)) {
        return state;
      }

      const nextGuessedChars = [...state.guessedChars, normalized];
      const isCorrect = state.currentWord.includes(normalized);
      const nextIncorrectGuesses = isCorrect
        ? state.incorrectGuesses
        : [...state.incorrectGuesses, normalized];

      const didWin = checkWin(state.currentWord, nextGuessedChars);
      const didLose = nextIncorrectGuesses.length === state.maxLives;

      return {
        ...state,
        guessedChars: nextGuessedChars,
        incorrectGuesses: nextIncorrectGuesses,
        gameStatus: didWin ? "won" : didLose ? "lost" : "playing",
      };
    }

    case "RESTART_GAME":
      return { ...initialState };

    default:
      return state;
  }
}

export function GameEngine() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);

  const startGame = useCallback(() => {
    if (!selectedDifficulty) return;
    const entry = getRandomWord(selectedDifficulty);

    dispatch({
      type: "START_GAME",
      payload: {
        difficulty: selectedDifficulty,
        word: entry.word.toUpperCase(),
        hint: entry.hint,
      },
    });
  }, [selectedDifficulty]);

  const guessChar = useCallback(
    (char: string) => {
      const normalized = normalizeChar(char);
      if (!normalized) return;
      if (state.gameStatus !== "playing") return;
      if (state.guessedChars.includes(normalized)) return;

      dispatch({ type: "GUESS_CHAR", payload: { char: normalized } });
    },
    [state.gameStatus, state.guessedChars],
  );

  const resetToStart = useCallback(() => {
    dispatch({ type: "RESTART_GAME" });
  }, []);

  useEffect(() => {
    sdk.actions.ready();
  }, []);
  
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      guessChar(event.key);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [guessChar]);

  if (state.gameStatus === "idle") {
    return (
      <StartScreen
        selectedDifficulty={selectedDifficulty}
        onSelectDifficulty={setSelectedDifficulty}
        onStartGame={startGame}
      />
    );
  }

  if (state.gameStatus === "won") {
    return <WinScreen currentWord={state.currentWord} onPlayAgain={resetToStart} />;
  }

  if (state.gameStatus === "lost") {
    return <LoseScreen currentWord={state.currentWord} onTryAgain={resetToStart} />;
  }

  return (
    <section className="mx-auto max-w-5xl space-y-5 rounded-2xl border border-blue-500/20 bg-slate-950/70 p-4 transition-all duration-300 md:p-6">
      <div className="grid gap-5 md:grid-cols-[280px_1fr]">
        <div className="flex justify-center">
          <HangmanDrawing wrongGuesses={state.incorrectGuesses.length} />
        </div>
        <div className="space-y-4">
          <WordDisplay currentWord={state.currentWord} guessedChars={state.guessedChars} hint={state.hint} />
          <GameStatus
            wrongGuesses={state.incorrectGuesses.length}
            maxLives={state.maxLives}
            incorrectGuesses={state.incorrectGuesses}
          />
        </div>
      </div>

      <Keyboard guessedChars={state.guessedChars} disabled={state.gameStatus !== "playing"} onGuess={guessChar} />
    </section>
  );
}
