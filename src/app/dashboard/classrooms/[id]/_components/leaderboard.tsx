'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { api } from '@/trpc/react';
import { useEffect, useState } from 'react';

interface LeaderboardProps {
  organizationId: string;
  gameState: 'not_started' | 'in_progress' | 'paused' | 'completed';
  createdAt: Date;
}

export function Leaderboard({ organizationId, gameState, createdAt }: LeaderboardProps) {
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [turnCount, setTurnCount] = useState<number>(0);

  useEffect(() => {
    if (gameState !== 'in_progress') {
      setTimeLeft(60);
      setTurnCount(0);
      return;
    }

    const interval = setInterval(() => {
      // Calculate elapsed time since game started
      const now = new Date();
      const gameStartTime = new Date(createdAt);
      const elapsedSeconds = Math.floor((now.getTime() - gameStartTime.getTime()) / 1000);

      // Calculate current turn (0-indexed)
      const currentTurn = Math.floor(elapsedSeconds / 60);

      // Calculate time left in current turn
      const secondsInCurrentTurn = elapsedSeconds % 60;
      const timeLeftInTurn = 60 - secondsInCurrentTurn;

      setTurnCount(currentTurn);
      setTimeLeft(timeLeftInTurn);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, createdAt]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Turn {turnCount}</span>
              <span>{timeLeft}s</span>
            </div>
            <Progress value={((60 - timeLeft) / 60) * 100} className="h-2" />
          </div>
          {/* Rest of the leaderboard content */}
        </div>
      </CardContent>
    </Card>
  );
}
