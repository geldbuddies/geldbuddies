'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/trpc/react';
import { PauseIcon, PlayIcon, SquareIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface GameControlsProps {
  organizationId: string;
  gameState: 'not_started' | 'in_progress' | 'paused' | 'completed';
}

export function GameControls({ organizationId, gameState }: GameControlsProps) {
  const router = useRouter();
  const updateGameState = api.organization.updateGameState.useMutation({
    onSuccess: () => {
      router.refresh();
      toast.success('Game status succesvol bijgewerkt');
    },
    onError: () => {
      toast.error('Er ging iets mis bij het updaten van de game status');
    },
  });

  const handleGameStateChange = (newState: GameControlsProps['gameState']) => {
    updateGameState.mutate({ organizationId, gameState: newState });
  };

  return (
    <Card className="shadow-md border-t-4 border-t-primary">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <span className="mr-2">Game Controls</span>
          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
            {gameState === 'not_started' && 'Niet gestart'}
            {gameState === 'in_progress' && 'Actief'}
            {gameState === 'paused' && 'Gepauzeerd'}
            {gameState === 'completed' && 'Afgelopen'}
          </span>
        </CardTitle>
        <CardDescription>
          {gameState === 'not_started' && 'Start het spel wanneer alle deelnemers er zijn'}
          {gameState === 'in_progress' && 'Het spel is bezig'}
          {gameState === 'paused' && 'Het spel is gepauzeerd'}
          {gameState === 'completed' && 'Het spel is afgelopen'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          {gameState === 'not_started' && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button disabled={updateGameState.isPending} size="lg" className="w-full sm:w-auto">
                  <PlayIcon className="size-4 mr-2" />
                  Start Game
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Start het spel</AlertDialogTitle>
                  <AlertDialogDescription>
                    Weet je zeker dat je het spel wilt starten? Alle spelers worden naar het spel
                    gestuurd en er kunnen geen nieuwe spelers meer deelnemen.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuleren</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleGameStateChange('in_progress')}>
                    Start spel
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {gameState === 'paused' && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button disabled={updateGameState.isPending} size="lg">
                  <PlayIcon className="size-4 mr-2" />
                  Resume Game
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Hervat het spel</AlertDialogTitle>
                  <AlertDialogDescription>
                    Weet je zeker dat je het spel wilt hervatten?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuleren</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleGameStateChange('in_progress')}>
                    Hervat spel
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {gameState === 'in_progress' && (
            <>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" disabled={updateGameState.isPending}>
                    <PauseIcon className="size-4 mr-2" />
                    Pause Game
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Pauzeer het spel</AlertDialogTitle>
                    <AlertDialogDescription>
                      Weet je zeker dat je het spel wilt pauzeren?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuleren</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleGameStateChange('paused')}>
                      Pauzeer spel
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" disabled={updateGameState.isPending}>
                    <SquareIcon className="size-4 mr-2" />
                    End Game
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Beëindig het spel</AlertDialogTitle>
                    <AlertDialogDescription>
                      Weet je zeker dat je het spel wilt beëindigen? Dit kan niet ongedaan worden
                      gemaakt.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuleren</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleGameStateChange('completed')}>
                      Beëindig spel
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}

          {gameState === 'completed' && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button disabled={updateGameState.isPending}>
                  <PlayIcon className="size-4 mr-2" />
                  New Game
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Nieuw spel starten</AlertDialogTitle>
                  <AlertDialogDescription>
                    Weet je zeker dat je een nieuw spel wilt starten?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuleren</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleGameStateChange('not_started')}>
                    Nieuw spel
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
