'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { api } from '@/trpc/react';
import { UserIcon } from 'lucide-react';

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
        </div>
        <ScrollArea className="h-[400px] w-full pr-4">
          <div className="space-y-2">
            {members?.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-2 rounded-lg bg-muted/50 border"
              >
                <div className="flex gap-2 items-center">
                  <UserIcon className="size-5 text-muted-foreground" />
                  <span className="text-sm font-medium">{member.user.name}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
