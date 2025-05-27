import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/trpc/server';
import { ExternalLink, Users } from 'lucide-react';
import Link from 'next/link';
import { GameControls } from './_components/game-controls';
import { Leaderboard } from './_components/leaderboard';
import { MembersList } from './_components/members-list';
import { TurnTimer } from './_components/turn-timer';

interface OrganizationPageProps {
  params: {
    id: string;
  };
}

export default async function OrganizationPage({ params }: OrganizationPageProps) {
  const { id } = await params;
  const organization = await api.organization.getOrganization({ id });

  return (
    <section className="flex flex-col h-screen bg-sidebar">
      <header className="h-14 shrink-0 pl-8 pr-1.5 border-b bg-sidebar">
        <div className="container h-full flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            {organization.name}
          </h1>
          <Button asChild variant="outline" className="gap-2 border-white/20 hover:bg-white/10">
            <Link href={`/join/${organization.id}`} target="_blank">
              Ga naar deelneemscherm <ExternalLink className="size-4" />
            </Link>
          </Button>
        </div>
      </header>

      <div className="flex-1 w-full overflow-y-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Game Controls */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="relative overflow-hidden bg-gradient-to-br from-background to-muted/50 backdrop-blur-sm border-muted/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-50" />
              <CardHeader className="pb-2 relative">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Game Controls</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <GameControls
                  organizationId={id}
                  gameState={
                    organization.gameState as 'not_started' | 'in_progress' | 'paused' | 'completed'
                  }
                />
              </CardContent>
            </Card>

            <TurnTimer
              organizationId={id}
              gameState={
                organization.gameState as 'not_started' | 'in_progress' | 'paused' | 'completed'
              }
              createdAt={organization.createdAt}
            />
          </div>

          {/* Members List */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-background to-muted/50 backdrop-blur-sm border-muted/50 shadow-lg hover:shadow-xl transition-all duration-300 h-fit">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-50" />
            <CardHeader className="pb-2 relative">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Members</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <MembersList organizationId={id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
