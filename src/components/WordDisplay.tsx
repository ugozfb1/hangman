interface WordDisplayProps {
  currentWord: string;
  guessedChars: string[];
  hint: string;
}

export function WordDisplay({ currentWord, guessedChars, hint }: WordDisplayProps) {
  return (
    <div className="space-y-4 rounded-xl border border-purple-500/30 bg-slate-900/60 p-5">
      <div className="flex flex-wrap justify-center gap-2 font-mono text-2xl font-bold tracking-widest text-slate-100 md:text-3xl">
        {currentWord.split("").map((char, index) => {
          const isRevealed = guessedChars.includes(char);
          return (
            <span key={`${char}-${index}`} className="inline-flex min-w-7 justify-center border-b-2 border-slate-400 pb-1">
              {isRevealed ? char : "_"}
            </span>
          );
        })}
      </div>
      <p className="text-center text-sm text-slate-300 md:text-base">
        <span className="text-purple-300">Hint:</span> {hint}
      </p>
    </div>
  );
}
