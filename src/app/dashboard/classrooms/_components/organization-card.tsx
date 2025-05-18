'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface OrganizationCardProps {
  id: string;
  name: string;
  createdAt: Date;
}

export function OrganizationCard({ id, name, createdAt }: OrganizationCardProps) {
  return (
    <Link href={`/dashboard/classrooms/${id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            Created: {new Date(createdAt).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
