import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import useGameStore from '@/store/game/game-store';
import { Calendar, DollarSign, User, Zap } from 'lucide-react';

interface GameHeaderProps {
  userName: string;
  currentDate: string;
  progress: number;
  secondsLeft: number;
}

export function GameHeader({ userName, currentDate, progress, secondsLeft }: GameHeaderProps) {
  const { player } = useGameStore();

  return (
    <header className="h-14 shrink-0 pl-8 pr-1.5 border-b bg-sidebar">
      <div className="container h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="gap-2 text-base border-white inset-shadow-xs">
            <User className="size-5 text-primary" />
            {userName}
          </Badge>
          <Badge variant="secondary" className="gap-2 text-base border-white inset-shadow-xs">
            <DollarSign className="size-5 text-emerald-500" />${player.money}
          </Badge>
          <Badge variant="secondary" className="gap-2 text-base border-white inset-shadow-xs">
            <Zap className="size-5 text-yellow-500" />
            {player.energy}/{player.maxEnergy}
          </Badge>
        </div>

        <div className="flex items-center gap-4 bg-blue-500/10 p-1.5 rounded-full border border-blue-400">
          <Badge variant="secondary" className="gap-2 text-base border-white inset-shadow-xs">
            <Calendar className="size-5 text-blue-500" />
            {currentDate}
          </Badge>
          <div className="flex items-center gap-2">
            <div className="w-32">
              <Progress value={progress} className="h-2 bg-blue-500/20" />
            </div>
            <span className="text-sm text-blue-500 font-medium w-8">{secondsLeft}s</span>
          </div>
        </div>
      </div>
    </header>
  );
}
