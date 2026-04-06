interface LoseScreenProps {
  currentWord: string;
  onTryAgain: () => void;
}

export function LoseScreen({ currentWord, onTryAgain }: LoseScreenProps) {
  return (
    <section className="mx-auto max-w-xl space-y-4 rounded-2xl border border-red-500/40 bg-slate-900/70 p-6 text-center shadow-xl shadow-red-950/20">
      <h2 className="text-3xl font-bold text-red-400">You Lost</h2>
      <p className="text-slate-200">The correct word was:</p>
      <p className="font-mono text-2xl font-bold tracking-wider text-red-300">{currentWord}</p>
      <button
        type="button"
        onClick={onTryAgain}
        className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white transition hover:brightness-110"
      >
        Try Again
      </button>
    </section>
  );
}
