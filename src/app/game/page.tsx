'use client';

import { TimeDisplay } from '@/components/game/time-display';
import { Button } from '@/components/ui/button';
import { useGameStore } from '@/store/game-store';

export default function GamePage() {
  const { resetGame } = useGameStore();

  return (
    <div className="container mx-auto p-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
        GeldBuddies Financial Simulator
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <TimeDisplay />
      </div>

      <div className="mt-8">
        <Button variant="destructive" onClick={resetGame}>
          Reset Game
        </Button>
      </div>
    </div>
  );
}
