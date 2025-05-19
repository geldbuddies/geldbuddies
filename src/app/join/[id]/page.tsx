import { auth } from '@/server/auth';
import { getServerSession } from '@/server/auth/utils';
import { api } from '@/trpc/server';
import { notFound } from 'next/navigation';
import { EmailOTPForm } from './_components/email-otp';
import { OwnerView } from './_components/owner-view';
import { WelcomeView } from './_components/welcome-view';

interface JoinOrganizationPageProps {
  params: {
    id: string;
  };
}

export default async function JoinOrganizationPage({ params }: JoinOrganizationPageProps) {
  const { id } = await params;
  const session = await getServerSession();

  try {
    // Get organization and member info
    const organization = await api.organization.getPublicOrganization({ id });
    const member = session?.user
      ? await api.organization.getMemberByUserId({
          organizationId: id,
          userId: session.user.id,
        })
      : null;

    if (!session?.user) {
      return <EmailOTPForm organizationId={id} />;
    }

    if (member?.role === 'owner') {
      return <OwnerView organizationId={id} />;
    }

    if (!member) {
      await auth.api.addMember({
        body: {
          userId: session.user.id,
          organizationId: id,
          role: 'member',
        },
      });
    }

    return <WelcomeView organizationId={id} />;
  } catch (error) {
    notFound();
  }
}
