'use client';

import { Card, CardContent } from '@/components/ui/card';
import { api } from '@/trpc/react';
import { UserIcon } from 'lucide-react';
import Link from 'next/link';

interface UsersListProps {
  organizationId: string;
}

export function UsersList({ organizationId }: UsersListProps) {
  const { data: members } = api.organization.getOrganizationMembers.useQuery(
    { organizationId },
    {
      refetchInterval: 10000,
    }
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {members?.map((member) => (
        <Link key={member.id} href={`/dashboard/classrooms/${organizationId}/users/${member.id}`}>
          <Card className="hover:shadow-md transition-all duration-300 cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted/50 border border-muted/50">
                  <UserIcon className="size-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{member.user.name}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
