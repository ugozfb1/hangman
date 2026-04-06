const KEYS = [
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
];

interface KeyboardProps {
  guessedChars: string[];
  disabled: boolean;
  onGuess: (char: string) => void;
}

export function Keyboard({ guessedChars, disabled, onGuess }: KeyboardProps) {
  return (
    <div className="grid grid-cols-6 gap-2 sm:grid-cols-9 md:grid-cols-12">
      {KEYS.map((char) => {
        const isUsed = guessedChars.includes(char);
        return (
          <button
            key={char}
            type="button"
            onClick={() => onGuess(char)}
            disabled={disabled || isUsed}
            className="rounded-md border border-blue-400/40 bg-slate-800 px-3 py-2 font-mono text-sm font-semibold text-slate-100 transition hover:border-blue-300 hover:bg-blue-500/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {char}
          </button>
        );
      })}
    </div>
  );
}
