'use client';

import { LogOutButton } from '@/components/auth/logout-button';
import { api } from '@/trpc/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface WelcomeViewProps {
  organizationId: string;
}

export function WelcomeView({ organizationId }: WelcomeViewProps) {
  const router = useRouter();
  const { data: organization } = api.organization.getPublicOrganization.useQuery(
    {
      id: organizationId,
    },
    {
      refetchInterval: 10000,
    }
  );

  useEffect(() => {
    if (organization && organization?.gameState !== 'not_started') {
      router.push(`/game/${organizationId}`);
    }
  }, [organization, router, organizationId]);

  if (!organization) return null;

  return (
    <div className="container flex mx-auto h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welkom bij {organization.name}</h1>
          <p className="text-sm text-muted-foreground">
            {organization.gameState === 'not_started' &&
              'Wacht tot de docent het spel start. Je wordt automatisch doorgestuurd wanneer het spel begint.'}
            {organization.gameState === 'paused' && 'Het spel is momenteel gepauzeerd.'}
            {organization.gameState === 'completed' && 'Het spel is afgelopen.'}
          </p>
        </div>
      </div>
      <LogOutButton />
    </div>
  );
}
