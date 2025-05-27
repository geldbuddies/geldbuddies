import { getServerSession } from '@/server/auth/utils';
import { notFound, redirect } from 'next/navigation';
import { createGameIfNotExists } from '@/app/game/actions/create-game'; // jouw server action voor game aanmaken
import { api } from '@/trpc/server'; // voorlopig nog TRPC voor member ophalen
import { GameView } from './_components/game-view';

interface GamePageProps {
  params: {
    id: string;
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = params; // let op: params is al een object, geen await nodig
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
