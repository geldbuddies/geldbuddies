import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { api } from '@/trpc/server';
import { notFound } from 'next/navigation';

interface JoinOrganizationPageProps {
  params: {
    id: string;
  };
}

export default async function JoinOrganizationPage({ params }: JoinOrganizationPageProps) {
  const { id } = await params;

  const organization = await api.organization.getOrganization({ id, refreshJoinCode: true });

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center bg-background">
      <div className="mx-auto flex w-full flex-col items-center justify-center space-y-8 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Join {organization.name}</h1>
          <p className="text-lg text-muted-foreground">Enter the code to join</p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <InputOTP
            maxLength={6}
            value={organization.joinCode as string}
            className="justify-center text-6xl tracking-wider"
          >
            <InputOTPGroup>
              <InputOTPSlot
                index={0}
                className="font-mono bg-primary text-background text-8xl size-24"
              />
              <InputOTPSlot
                index={1}
                className="font-mono bg-primary text-background text-8xl size-24"
              />
              <InputOTPSlot
                index={2}
                className="font-mono bg-primary text-background text-8xl size-24"
              />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot
                index={3}
                className="font-mono bg-primary text-background text-8xl size-24"
              />
              <InputOTPSlot
                index={4}
                className="font-mono bg-primary text-background text-8xl size-24"
              />
              <InputOTPSlot
                index={5}
                className="font-mono bg-primary text-background text-8xl size-24"
              />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>
    </div>
  );
}
