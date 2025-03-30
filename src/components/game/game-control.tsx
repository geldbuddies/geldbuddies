'use client';

import { Button } from '@/components/ui/button';
import { useGame } from '@/lib/game/context';

export function GameControl() {
  const { dispatch } = useGame();

  const handleNextMonth = () => {
    dispatch({ type: 'NEXT_MONTH' });
  };

  return (
    <div className="p-4 border-t border-border flex justify-end">
      <Button onClick={handleNextMonth}>Volgende maand</Button>
    </div>
  );
}
