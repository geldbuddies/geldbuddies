import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/trpc/server';
import { ExternalLink, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { Fragment } from 'react';
import { UserDetails } from './_components/user-details';

interface UserPageProps {
  params: {
    id: string;
    userId: string;
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const { id, userId } = await params;

  const organization = await api.organization.getOrganization({
    id,
  });

  if (!organization) {
    return null;
  }

  return (
    <Fragment>
      <header className="h-14 shrink-0 pl-8 pr-1.5 border-b bg-sidebar">
        <div className="container h-full flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            {organization.name}
          </h1>
          <Button asChild variant="outline" className="gap-2 border-white/20 hover:bg-white/10">
            <Link href={`/join/${organization.id}`} target="_blank">
              Ga naar deelneemscherm <ExternalLink className="size-4" />
            </Link>
          </Button>
        </div>
      </header>
      <section className="flex flex-col h-screen bg-sidebar">
        <div className="flex-1 w-full overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <Card className="relative overflow-hidden bg-gradient-to-br from-background to-muted/50 backdrop-blur-sm border-muted/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-50" />
              <CardHeader className="pb-2 relative">
                <div className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Gebruiker details</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <UserDetails organizationId={id} userId={userId} />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
