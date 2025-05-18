import { api } from '@/trpc/server';
import { CreateOrganizationDialog } from './_components/create-organization-dialog';
import { OrganizationCard } from './_components/organization-card';

type Organization = {
  id: string;
  name: string;
  createdAt: Date;
};

export default async function ClassroomsPage() {
  const organizations = await api.organization.getOrganizations();

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Classrooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {organizations?.map((org: Organization) => (
          <OrganizationCard key={org.id} id={org.id} name={org.name} createdAt={org.createdAt} />
        ))}
        <CreateOrganizationDialog />
      </div>
    </section>
  );
}
