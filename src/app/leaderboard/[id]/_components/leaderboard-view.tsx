'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { api } from '@/trpc/react';
import { Calendar, Trophy, UserIcon } from 'lucide-react';
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

interface LeaderboardViewProps {
  organizationId: string;
}

export function LeaderboardView({ organizationId }: LeaderboardViewProps) {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentDate, setCurrentDate] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(90);

  const { data: organization } = api.organization.getPublicOrganization.useQuery({
    id: organizationId,
  });

  const { data: members } = api.organization.getOrganizationMembers.useQuery(
    { organizationId },
    { refetchInterval: 10000 }
  );

  // Fetch game data for each member
  const { data: memberGames } = api.game.getGamesByOrganization.useQuery(
    { organizationId },
    { refetchInterval: 10000 }
  );

  useEffect(() => {
    if (!organization || organization.gameState !== 'in_progress') {
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const gameStartTime = new Date(organization.createdAt);
      const elapsedSeconds = Math.floor((now.getTime() - gameStartTime.getTime()) / 1000);

      // Calculate current month (90 seconds per month)
      const currentMonth = Math.floor(elapsedSeconds / 90);
      const secondsInCurrentMonth = elapsedSeconds % 90;
      const progress = (secondsInCurrentMonth / 90) * 100;

      // Calculate date based on elapsed months
      const startDate = new Date(organization.createdAt);
      const currentDate = new Date(startDate);
      currentDate.setMonth(startDate.getMonth() + currentMonth);

      // Update state
      setCurrentProgress(progress);
      setCurrentDate(`${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`);
      setSecondsLeft(90 - secondsInCurrentMonth);
    }, 1000);

    return () => clearInterval(interval);
  }, [organization]);

  if (!organization || !members || !memberGames) return null;

  // Create a map of member IDs to their game data
  const memberGameMap = new Map(
    memberGames.map((game) => [game.memberId, game.gameData?.player.money ?? 0])
  );

  // Sort members by their money
  const sortedMembers = [...members].sort((a, b) => {
    const moneyA = memberGameMap.get(a.id) ?? 0;
    const moneyB = memberGameMap.get(b.id) ?? 0;
    return moneyB - moneyA;
  });

  return (
    <main className="flex flex-col h-screen bg-sidebar">
      <header className="h-14 shrink-0 pl-8 pr-1.5 border-b bg-sidebar">
        <div className="container mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="gap-2 text-base border-white inset-shadow-xs">
              <Trophy className="size-5 text-primary" />
              {organization.name}
            </Badge>
          </div>

          <div className="flex items-center gap-4 bg-blue-500/10 p-1.5 rounded-full border border-blue-400">
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
        </div>
      </header>

      <div className="flex-1 w-full overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden bg-gradient-to-br from-background to-muted/50 backdrop-blur-sm border-muted/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-50" />
            <CardHeader className="pb-2 relative">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Leaderboard</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="space-y-4">
                  {sortedMembers.map((member, index) => (
                    <div
                      key={member.id}
                      className="group relative overflow-hidden flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-background to-muted/50 border border-muted/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 backdrop-blur-sm"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Rank Badge */}
                      <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold border border-primary/20 shadow-lg shadow-primary/5">
                        {index + 1}
                      </div>

                      {/* Player Info */}
                      <div className="relative flex items-center gap-3 flex-1">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 border border-muted/50 group-hover:border-primary/20 transition-colors duration-300">
                          <UserIcon className="size-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                        </div>
                        <div>
                          <p className="text-lg font-medium group-hover:text-primary transition-colors duration-300">
                            {member.user.name}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground group-hover:text-primary/80 transition-colors duration-300">
                              Geld:
                            </span>
                            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                              €{memberGameMap.get(member.id)?.toLocaleString() ?? 0}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
