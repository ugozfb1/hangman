import { DifficultySelect } from "@/components/DifficultySelect";
import type { Difficulty } from "@/types";

interface StartScreenProps {
  selectedDifficulty: Difficulty | null;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onStartGame: () => void;
}

export function StartScreen({ selectedDifficulty, onSelectDifficulty, onStartGame }: StartScreenProps) {
  return (
    <section className="mx-auto max-w-xl space-y-6 rounded-2xl border border-blue-500/30 bg-slate-900/70 p-6 text-center shadow-xl shadow-blue-950/30">
      <h1 className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
        Hangman
      </h1>
      <p className="text-slate-300">Base-themed crypto word challenge</p>

      <DifficultySelect selectedDifficulty={selectedDifficulty} onSelect={onSelectDifficulty} />

      <button
        type="button"
        onClick={onStartGame}
        disabled={!selectedDifficulty}
        className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Start Game
      </button>
    </section>
  );
}
