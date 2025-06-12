'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { NameForm } from './name-form';

const otpSchema = z.object({
  otp: z.string().length(6, 'Voer een geldige verificatiecode in'),
});

interface OTPFormProps {
  email: string;
}

export function OTPForm({ email }: OTPFormProps) {
  const router = useRouter();
  const [isNewUser, setIsNewUser] = useState(false);

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  async function onVerifyOTP(otp: string) {
    try {
      const { data, error } = await authClient.signIn.emailOtp({
        email,
        otp,
      });

      if (error) {
        toast.error('Ongeldige verificatiecode');
        return;
      }

      // Check if user is new (has no name set)
      const user = data?.user;
      if (user && !user.name) {
        setIsNewUser(true);
        return;
      }

      toast.success('Succesvol ingelogd');
      router.refresh();
    } catch {
      toast.error('Er ging iets mis bij het verifiëren van de code');
    }
  }

  if (isNewUser) {
    return <NameForm />;
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Verificatiecode verstuurd</h1>
          <p className="text-sm text-muted-foreground">
            Voer de code in die we naar {email} hebben gestuurd
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verificatiecode</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                        if (value.length === 6) {
                          onVerifyOTP(value);
                        }
                      }}
                      className="justify-center text-6xl tracking-wider"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="font-mono uppercase text-8xl size-24" />
                        <InputOTPSlot index={1} className="font-mono uppercase text-8xl size-24" />
                        <InputOTPSlot index={2} className="font-mono uppercase text-8xl size-24" />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} className="font-mono uppercase text-8xl size-24" />
                        <InputOTPSlot index={4} className="font-mono uppercase text-8xl size-24" />
                        <InputOTPSlot index={5} className="font-mono uppercase text-8xl size-24" />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
