'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { api } from '@/trpc/react';
import { Trophy, UserIcon } from 'lucide-react';

interface LeaderboardViewProps {
  organizationId: string;
}

export function LeaderboardView({ organizationId }: LeaderboardViewProps) {
  const { data: organization } = api.organization.getOrganization.useQuery({
    id: organizationId,
  });

  const { data: members } = api.organization.getOrganizationMembers.useQuery(
    { organizationId },
    { refetchInterval: 10000 }
  );

  if (!organization || !members) return null;

  return (
    <main className="container mx-auto flex p-8 gap-8 justify-center items-start fixed inset-0">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trophy className="size-6 text-primary" />
            <CardTitle className="text-2xl">Leaderboard - {organization.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="space-y-4">
              {members.map((member, index) => (
                <div
                  key={member.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex items-center gap-3 flex-1">
                    <UserIcon className="size-5 text-muted-foreground" />
                    <div>
                      <p className="text-lg font-medium">{member.user.name}</p>
                      <p className="text-sm text-muted-foreground">Geld: 0</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </main>
  );
}
