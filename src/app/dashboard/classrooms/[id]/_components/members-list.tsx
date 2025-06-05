'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { api } from '@/trpc/react';
import { UserIcon, Users } from 'lucide-react';
import Link from 'next/link';

interface MembersListProps {
  organizationId: string;
}

export function MembersList({ organizationId }: MembersListProps) {
  const { data: members } = api.organization.getOrganizationMembers.useQuery(
    { organizationId },
    {
      refetchInterval: 10000,
    }
  );

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Deelnemers ({members?.length ?? 0})</h2>
          <Link href={`/dashboard/classrooms/${organizationId}/users`}>
            <Button variant="outline" size="sm" className="gap-2">
              <Users className="size-4" />
              Alle gebruikers
            </Button>
          </Link>
        </div>
        <ScrollArea className="h-[400px] w-full pr-4">
          <div className="flex flex-col gap-2">
            {members?.map((member) => (
              <Link
                key={member.id}
                href={`/dashboard/classrooms/${organizationId}/users/${member.id}`}
              >
                <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50 border hover:bg-muted/80 transition-colors cursor-pointer">
                  <div className="flex gap-2 items-center">
                    <UserIcon className="size-5 text-muted-foreground" />
                    <span className="text-sm font-medium">{member.user.name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
