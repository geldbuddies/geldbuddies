import { createGameIfNotExists } from '@/app/game/actions/create-game'; // jouw server action voor game aanmaken
import { getServerSession } from '@/server/auth/utils';
import { api } from '@/trpc/server'; // voorlopig nog TRPC voor member ophalen
import { notFound, redirect } from 'next/navigation';
import { GameView } from './_components/game-view';

interface GamePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params;
  const session = await getServerSession();

  if (!session?.user) {
    redirect('/auth/signin');
  }

  // Haal member op via TRPC (of maak hiervan ook een server action als je wilt)
  const member = await api.organization.getMemberByUserId({
    organizationId: id,
    userId: session.user.id,
  });

  if (!member) {
    notFound();
  }

  // Gebruik je server action om game te checken of aan te maken
  const game = await createGameIfNotExists({
    memberId: member.id,
    organizationId: id,
  });

  return <GameView gameId={game.id} organizationId={id} />;
}
