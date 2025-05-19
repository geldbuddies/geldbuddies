import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/trpc/server';
import { notFound } from 'next/navigation';

interface JoinOrganizationPageProps {
  params: {
    id: string;
  };
}

export default async function JoinOrganizationPage({ params }: JoinOrganizationPageProps) {
  try {
    const organization = await api.organization.getOrganization({ id: params.id });

    return (
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Join {organization.name}</h1>
            <p className="text-sm text-muted-foreground">
              Please confirm your details to join this classroom
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Classroom Details</CardTitle>
              <CardDescription>
                Created on {new Date(organization.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Name</p>
                <p className="text-sm text-muted-foreground">{organization.name}</p>
              </div>
              {organization.slug && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Slug</p>
                  <p className="text-sm text-muted-foreground">{organization.slug}</p>
                </div>
              )}
              <Button className="w-full">Join Classroom</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
