interface GameStatusProps {
  wrongGuesses: number;
  maxLives: number;
  incorrectGuesses: string[];
}

export function GameStatus({ wrongGuesses, maxLives, incorrectGuesses }: GameStatusProps) {
  const livesLeft = maxLives - wrongGuesses;

  return (
    <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
      <p className="text-slate-200">
        Lives: <span className="font-semibold text-blue-300">{livesLeft}</span> / {maxLives}
      </p>
      <p className="text-sm text-slate-300">
        Incorrect guesses:{" "}
        <span className="font-mono text-red-300">
          {incorrectGuesses.length > 0 ? incorrectGuesses.join(", ") : "-"}
        </span>
      </p>
    </div>
  );
}
