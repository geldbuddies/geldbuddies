'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { api } from '@/trpc/react';
import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface TurnTimerProps {
  organizationId: string;
  gameState: 'not_started' | 'in_progress' | 'paused' | 'completed';
  createdAt: Date;
}

export function TurnTimer({ organizationId, gameState, createdAt }: TurnTimerProps) {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentDate, setCurrentDate] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(90);

  useEffect(() => {
    if (gameState !== 'in_progress') {
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const gameStartTime = new Date(createdAt);
      const elapsedSeconds = Math.floor((now.getTime() - gameStartTime.getTime()) / 1000);

      // Calculate current month (90 seconds per month)
      const currentMonth = Math.floor(elapsedSeconds / 90);
      const secondsInCurrentMonth = elapsedSeconds % 90;
      const progress = (secondsInCurrentMonth / 90) * 100;

      // Calculate date based on elapsed months
      const startDate = new Date(createdAt);
      const currentDate = new Date(startDate);
      currentDate.setMonth(startDate.getMonth() + currentMonth);

      // Update state
      setCurrentProgress(progress);
      setCurrentDate(`${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`);
      setSecondsLeft(90 - secondsInCurrentMonth);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, createdAt]);

  return (
    <Card className="backdrop-blur-sm bg-white/50 border w-fit border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Game Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 bg-blue-500/10 p-3 rounded-xl border border-blue-400/50">
          <Badge variant="secondary" className="gap-2 text-base border-white inset-shadow-xs">
            <Calendar className="size-5 text-blue-500" />
            {currentDate}
          </Badge>
          <div className="flex items-center gap-2">
            <div className="w-32">
              <Progress value={currentProgress} className="h-2 bg-blue-500/20" />
            </div>
            <span className="text-sm text-blue-500 font-medium w-8">{secondsLeft}s</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
