interface WinScreenProps {
  currentWord: string;
  onPlayAgain: () => void;
}

export function WinScreen({ currentWord, onPlayAgain }: WinScreenProps) {
  return (
    <section className="mx-auto max-w-xl space-y-4 rounded-2xl border border-emerald-400/40 bg-slate-900/70 p-6 text-center shadow-xl shadow-emerald-900/20">
      <h2 className="text-3xl font-bold text-emerald-300">You Won!</h2>
      <p className="text-slate-200">Great job. The word was:</p>
      <p className="font-mono text-2xl font-bold tracking-wider text-emerald-200">{currentWord}</p>
      <button
        type="button"
        onClick={onPlayAgain}
        className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white transition hover:brightness-110"
      >
        Play Again
      </button>
    </section>
  );
}
