import { Button } from '@/components/ui/button';
import { api } from '@/trpc/server';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { GameControls } from './_components/game-controls';
import { MembersList } from './_components/members-list';

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{organization.name}</h1>
        <Button asChild variant="outline">
          <Link href={`/join/${organization.id}`} target="_blank">
            Ga naar deelneemscherm <ExternalLink className="size-4 ml-2" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game Controls */}
        <div className="lg:col-span-2">
          <GameControls
            organizationId={id}
            gameState={
              organization.gameState as 'not_started' | 'in_progress' | 'paused' | 'completed'
            }
          />
        </div>

        {/* Members List */}
        <MembersList organizationId={id} />
      </div>
    </section>
  );
}
