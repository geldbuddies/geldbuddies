import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import useGameStore from '@/store/game/game-store';
import { Battery } from 'lucide-react';
import { toast } from 'sonner';

interface GameStatusProps {
  onEnergyAction: () => void;
  isSaving: boolean;
}

export function GameStatus({ onEnergyAction, isSaving }: GameStatusProps) {
  const { player } = useGameStore();

  return (
    <div className="p-4 rounded-lg bg-muted/50 border">
      <p className="text-lg font-medium">Game Status</p>

      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Battery className="size-5 text-primary" />
            <span className="font-medium">Energy</span>
          </div>
          <span>
            {player.energy} / {player.maxEnergy}
          </span>
        </div>

        <Progress value={(player.energy / player.maxEnergy) * 100} className="h-2" />

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Energy is used for actions. When it reaches 0, your progress will be saved.
          </span>
        </div>
      </div>

      <div className="mt-4">
        <Button onClick={onEnergyAction} disabled={player.energy < 10 || isSaving}>
          Use 10 Energy
        </Button>
      </div>
    </div>
  );
}
