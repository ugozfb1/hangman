interface HangmanDrawingProps {
  wrongGuesses: number;
}

export function HangmanDrawing({ wrongGuesses }: HangmanDrawingProps) {
  return (
    <div className="rounded-xl border border-blue-500/30 bg-slate-900/60 p-4 shadow-lg shadow-blue-900/20">
      <svg viewBox="0 0 220 260" className="h-64 w-full max-w-[240px] stroke-slate-200">
        <line x1="20" y1="240" x2="140" y2="240" strokeWidth="4" />
        <line x1="50" y1="240" x2="50" y2="20" strokeWidth="4" />
        <line x1="50" y1="20" x2="130" y2="20" strokeWidth="4" />
        <line x1="130" y1="20" x2="130" y2="45" strokeWidth="4" />

        {wrongGuesses >= 1 && <circle cx="130" cy="65" r="20" fill="none" strokeWidth="4" />}
        {wrongGuesses >= 2 && <line x1="130" y1="85" x2="130" y2="145" strokeWidth="4" />}
        {wrongGuesses >= 3 && <line x1="130" y1="100" x2="98" y2="125" strokeWidth="4" />}
        {wrongGuesses >= 4 && <line x1="130" y1="100" x2="162" y2="125" strokeWidth="4" />}
        {wrongGuesses >= 5 && <line x1="130" y1="145" x2="104" y2="190" strokeWidth="4" />}
        {wrongGuesses >= 6 && <line x1="130" y1="145" x2="156" y2="190" strokeWidth="4" />}
      </svg>
    </div>
  );
}
