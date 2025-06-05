'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const emailSchema = z.object({
  email: z.string().email('Voer een geldig e-mailadres in'),
});

interface EmailFormProps {
  onEmailSent: (email: string) => void;
}

export function EmailForm({ onEmailSent }: EmailFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof emailSchema>) {
    try {
      setIsLoading(true);
      const { data, error } = await authClient.emailOtp.sendVerificationOtp({
        email: values.email,
        type: 'sign-in',
      });

      if (error) {
        toast.error('Er ging iets mis bij het versturen van de code');
        return;
      }

      onEmailSent(values.email);
      toast.success('Verificatiecode verstuurd naar je e-mail');
    } catch (error) {
      toast.error('Er ging iets mis bij het versturen van de code');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Voer je e-mailadres in</h1>
          <p className="text-sm text-muted-foreground">
            We sturen je een verificatiecode om deel te nemen
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mailadres</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="jouw@email.nl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Versturen...' : 'Verificatiecode versturen'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
