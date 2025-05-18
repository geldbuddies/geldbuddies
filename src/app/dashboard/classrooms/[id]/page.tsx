import { api } from '@/trpc/server';
import { notFound } from 'next/navigation';

interface OrganizationPageProps {
  params: {
    id: string;
  };
}

export default async function OrganizationPage({ params }: OrganizationPageProps) {
  try {
    const organization = await api.organization.getOrganization({ id: params.id });

    return (
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">{organization.name}</h1>
        <div className="grid gap-4">
          <div className="p-4 border rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Details</h2>
            <p className="text-sm text-gray-500">
              Created: {new Date(organization.createdAt).toLocaleDateString()}
            </p>
            {organization.slug && (
              <p className="text-sm text-gray-500">Slug: {organization.slug}</p>
            )}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    notFound();
  }
}
