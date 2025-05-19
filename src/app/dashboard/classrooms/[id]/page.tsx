import { api } from '@/trpc/server';
import { notFound } from 'next/navigation';
import { ClassroomTabs } from './_components/classroom-tabs';

interface OrganizationPageProps {
  params: {
    id: string;
  };
}

export default async function OrganizationPage({ params }: OrganizationPageProps) {
  const { id } = await params;

  try {
    const organization = await api.organization.getOrganization({ id });

    return (
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">{organization.name}</h1>
        <ClassroomTabs organizationName={organization.name} />
      </section>
    );
  } catch (error) {
    notFound();
  }
}
