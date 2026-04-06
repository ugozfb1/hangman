import type { Difficulty } from "@/types";

const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard", "very_hard"];

interface DifficultySelectProps {
  selectedDifficulty: Difficulty | null;
  onSelect: (difficulty: Difficulty) => void;
}

export function DifficultySelect({ selectedDifficulty, onSelect }: DifficultySelectProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {DIFFICULTIES.map((difficulty) => {
        const isActive = selectedDifficulty === difficulty;
        return (
          <button
            key={difficulty}
            type="button"
            onClick={() => onSelect(difficulty)}
            className={`rounded-lg border px-4 py-3 text-sm font-semibold capitalize transition ${
              isActive
                ? "border-purple-400 bg-purple-500/20 text-purple-200"
                : "border-slate-600 bg-slate-800/70 text-slate-200 hover:border-blue-400 hover:bg-blue-500/20"
            }`}
          >
            {difficulty.replace("_", " ")}
          </button>
        );
      })}
    </div>
  );
}
