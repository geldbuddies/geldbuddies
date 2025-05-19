'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import useGameStore from '@/store/game/game-store';
import { api } from '@/trpc/react';
import { Battery, Gamepad2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface GameViewProps {
  gameId: string;
  organizationId: string;
}

export function GameView({ gameId, organizationId }: GameViewProps) {
  const { data: game } = api.game.getGame.useQuery({ id: gameId });
  const { data: organization } = api.organization.getOrganization.useQuery({
    id: organizationId,
  });

  // Initialize game store
  const {
    player,
    jobs,
    assets,
    goods,
    history,
    time,
    useEnergy,
    resetEnergy,
    resetGame,
    initializePlayer,
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

  // Handle action that uses energy
  const handleEnergyAction = () => {
    if (useEnergy(10)) {
      toast.success('Used 10 energy points!');
    } else {
      toast.error('Not enough energy!');
    }
  };

  if (!game || !organization) return null;

  return (
    <main className="container mx-auto flex p-8 gap-8 justify-center items-start fixed inset-0">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Gamepad2 className="size-6 text-primary" />
            <CardTitle className="text-2xl">Game - {organization.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
                <Button
                  onClick={handleEnergyAction}
                  disabled={player.energy < 10 || saveGameData.isPending}
                >
                  Use 10 Energy
                </Button>
              </div>
            </div>
            {/* Add more game UI components here */}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
