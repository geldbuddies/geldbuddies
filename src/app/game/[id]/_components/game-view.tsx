'use client';

import { authClient } from '@/lib/auth-client';
import useGameStore from '@/store/game/game-store';
import { api } from '@/trpc/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { GameDashboard } from './game-dashboard';
import { GameHeader } from './game-header';
import { MonthSummaryDialog } from './month-summary-dialog';

interface GameViewProps {
  gameId: string;
  organizationId: string;
}

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

export function GameView({ gameId, organizationId }: GameViewProps) {
  const { data: session } = authClient.useSession();
  const { data: game } = api.game.getGame.useQuery({ id: gameId });
  const { data: organization } = api.organization.getOrganization.useQuery({
    id: organizationId,
  });

  // Initialize game store
  const {
    player,
    history,
    time,
    resetEnergy,
    initializePlayer,
    advanceMonth,
    syncTimeWithOrganization,
  } = useGameStore();

  // Save game data mutation
  const saveGameData = api.game.saveGameData.useMutation({
    onSuccess: () => {
      toast.success('Game data saved successfully');
      resetEnergy(); // Reset energy after saving
    },
    onError: (error) => {
      toast.error(`Error saving game data: ${error.message}`);
    },
  });

  // Initialize player if not already initialized
  useEffect(() => {
    if (!player.isInitialized) {
      initializePlayer({
        money: 1000,
        name: 'Player',
        birthMonth: 1,
        birthYear: 2000,
      });
    }
  }, [player.isInitialized, initializePlayer]);

  // Save game data when energy reaches 0
  useEffect(() => {
    if (player.energy === 0) {
      const gameData = useGameStore.getState();
      saveGameData.mutate({
        id: gameId,
        gameData: {
          player: gameData.player,
          jobs: gameData.jobs,
          assets: gameData.assets,
          goods: gameData.goods,
          history: gameData.history,
          time: gameData.time,
        },
      });
    }
  }, [player.energy, gameId, saveGameData]);

  const [isMonthSummaryOpen, setIsMonthSummaryOpen] = useState(false);
  const [currentMonthEvents, setCurrentMonthEvents] = useState<typeof history.events>([]);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentDate, setCurrentDate] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(90);

  useEffect(() => {
    if (!organization || organization.gameState !== 'in_progress') {
      return;
    }

    // Sync the store time with organization creation date
    syncTimeWithOrganization(new Date(organization.createdAt));

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

      // Handle month transition
      if (secondsInCurrentMonth === 0 && elapsedSeconds > 0) {
        advanceMonth();

        // Get the current game time for filtering events
        const currentGameTime = time.year * 10000 + time.month * 100;
        const nextGameTime = time.year * 10000 + (time.month + 1) * 100;

        // Filter events for the current month
        const monthEvents = history.events.filter(
          (event) => event.timestamp >= currentGameTime && event.timestamp < nextGameTime
        );

        // Sync game data when month ends
        const gameData = useGameStore.getState();
        saveGameData.mutate({
          id: gameId,
          gameData: {
            player: gameData.player,
            jobs: gameData.jobs,
            assets: gameData.assets,
            goods: gameData.goods,
            history: gameData.history,
            time: gameData.time,
          },
        });

        setCurrentMonthEvents(monthEvents);
        setIsMonthSummaryOpen(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    organization,
    advanceMonth,
    history.events,
    syncTimeWithOrganization,
    time,
    gameId,
    saveGameData,
  ]);

  // Auto-close month summary dialog after 30 seconds
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isMonthSummaryOpen) {
      timeout = setTimeout(() => {
        setIsMonthSummaryOpen(false);
      }, 30000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isMonthSummaryOpen]);

  if (!game || !organization) return null;

  return (
    <main className="flex flex-col h-screen bg-sidebar">
      <GameHeader
        userName={session?.user?.name ?? 'Player'}
        currentDate={currentDate}
        progress={currentProgress}
        secondsLeft={secondsLeft}
      />

      <div className="flex-1 w-full overflow-y-auto p-8 inset-shadow-sm rounded-4xl bg-white border">
        <GameDashboard />
      </div>

      <MonthSummaryDialog
        isOpen={isMonthSummaryOpen}
        onClose={() => setIsMonthSummaryOpen(false)}
        events={currentMonthEvents}
      />
    </main>
  );
}
