import { getServerSession } from '@/server/auth/utils';
import { api } from '@/trpc/server';
import { notFound, redirect } from 'next/navigation';
import { GameView } from './_components/game-view';

interface GamePageProps {
  params: {
    id: string;
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params;
  const session = await getServerSession();

  if (!session?.user) {
    redirect('/auth/signin');
  }

  try {
    // Get organization and member info
    const member = await api.organization.getMemberByUserId({
      organizationId: id,
      userId: session.user.id,
    });

    if (!member) {
      notFound();
    }

    // Check if game exists
    let game = await api.game.getGameByMember({
      memberId: member.id,
      organizationId: id,
    });

    // Create game if it doesn't exist
    if (!game) {
      game = await api.game.createGame({
        memberId: member.id,
        organizationId: id,
      });
    }

    return <GameView gameId={game.id} organizationId={id} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}
