'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OrganizationCardProps {
  name: string;
}

export function OrganizationCard({ name }: OrganizationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>{/* Content will be added later */}</CardContent>
    </Card>
  );
}
