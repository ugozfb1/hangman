import { GameEngine } from "@/components/GameEngine";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-[#0b1533] to-[#1b1246] px-4 py-8 text-slate-100 md:px-8">
      <div className="mx-auto max-w-6xl">
        <GameEngine />
      </div>
    </main>
  );
}