'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/trpc/react';
import { Gamepad2 } from 'lucide-react';

interface GameViewProps {
  gameId: string;
  organizationId: string;
}

export function GameView({ gameId, organizationId }: GameViewProps) {
  const { data: game } = api.game.getGame.useQuery({ id: gameId });

  const { data: organization } = api.organization.getOrganization.useQuery({
    id: organizationId,
  });

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
            </div>
            {/* Add more game UI components here */}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
