'use client';

import { authClient } from '@/lib/auth-client';
import { CreateOrganizationDialog } from './_components/create-organization-dialog';
import { OrganizationCard } from './_components/organization-card';

export default function DashboardPage() {
  const { data: organizations } = authClient.useListOrganizations();

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Overzicht</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {organizations?.map((org) => (
          <OrganizationCard key={org.id} name={org.name} />
        ))}
        <CreateOrganizationDialog />
      </div>
    </section>
  );
}
