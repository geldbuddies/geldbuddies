'use client';

import { LogOutButton } from '@/components/auth/logout-button';
import { Card, CardContent } from '@/components/ui/card';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { ScrollArea } from '@/components/ui/scroll-area';
import { api } from '@/trpc/react';
import { UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface OwnerViewProps {
  organizationId: string;
}

export function OwnerView({ organizationId }: OwnerViewProps) {
  const router = useRouter();

  const { data: organization } = api.organization.getOrganization.useQuery({
    id: organizationId,
    refreshJoinCode: true,
  });

  const { data: members } = api.organization.getOrganizationMembers.useQuery(
    { organizationId },
    { refetchInterval: 10000 }
  );

  useEffect(() => {
    if (organization && organization?.gameState !== 'not_started') {
      router.push(`/leaderboard/${organizationId}`);
    }
  }, [organization, router, organizationId]);

  if (!organization) return null;

  return (
    <main className="container mx-auto flex p-16 gap-16 justify-center items-center fixed inset-0 flex-col">
      <section className="space-y-8">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Neem deel aan klas &apos;{organization.name}&apos;
          </h1>

          <p className="text-lg text-muted-foreground">
            Ga naar{' '}
            <Link
              target="_blank"
              href={`https://geldbuddies.nl/join`}
              className="text-primary font-medium"
            >
              geldbuddies.nl/join
            </Link>
          </p>
          <p className="text-lg text-muted-foreground">Voer de code in</p>
          <p className="text-lg text-muted-foreground">Wacht tot de docent de game start</p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <InputOTP
            maxLength={6}
            value={organization.joinCode as string}
            className="justify-center text-6xl tracking-wider"
          >
            <InputOTPGroup>
              <InputOTPSlot
                index={0}
                className="font-mono bg-primary text-background text-8xl size-24"
              />
              <InputOTPSlot
                index={1}
                className="font-mono bg-primary text-background text-8xl size-24"
              />
              <InputOTPSlot
                index={2}
                className="font-mono bg-primary text-background text-8xl size-24"
              />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot
                index={3}
                className="font-mono bg-primary text-background text-8xl size-24"
              />
              <InputOTPSlot
                index={4}
                className="font-mono bg-primary text-background text-8xl size-24"
              />
              <InputOTPSlot
                index={5}
                className="font-mono bg-primary text-background text-8xl size-24"
              />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </section>
      <section className="flex-1 w-full">
        <Card className="w-full h-full">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Members ({members?.length ?? 0})</h2>
            </div>
            <ScrollArea className="w-full">
              <ul className="columns-3">
                {members?.map((member) => (
                  <li
                    key={member.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/50 border"
                  >
                    <div className="flex gap-2 items-center">
                      <UserIcon className="size-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-lg font-medium">{member.user.name}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      </section>
      <LogOutButton />
    </main>
  );
}
