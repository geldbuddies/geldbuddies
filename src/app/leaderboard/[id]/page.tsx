import { getServerSession } from '@/server/auth/utils';
import { api } from '@/trpc/server';
import { notFound, redirect } from 'next/navigation';
import { LeaderboardView } from './_components/leaderboard-view';

interface LeaderboardPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function LeaderboardPage({ params }: LeaderboardPageProps) {
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

    if (!member || member.role !== 'owner') {
      notFound();
    }

    return <LeaderboardView organizationId={id} />;
  } catch {
    notFound();
  }
}
