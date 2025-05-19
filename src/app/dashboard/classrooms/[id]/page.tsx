import { Button } from '@/components/ui/button';
import { api } from '@/trpc/server';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface OrganizationPageProps {
  params: {
    id: string;
  };
}

export default async function OrganizationPage({ params }: OrganizationPageProps) {
  const { id } = await params;

  const organization = await api.organization.getOrganization({ id });

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{organization.name}</h1>
      <Button asChild>
        <Link href={`/join/${organization.id}`} target="_blank">
          Ga naar deelneemscherm <ExternalLink className="size-4" />
        </Link>
      </Button>
    </section>
  );
}
