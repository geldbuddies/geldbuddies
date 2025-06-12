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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { api } from '@/trpc/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
  code: z.string().length(6, 'Join code moet 6 karakters lang zijn'),
});

export function JoinForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
    },
  });

  const { refetch } = api.organization.getOrganizationByJoinCode.useQuery(
    { joinCode: form.watch('code') },
    {
      enabled: false,
      retry: false,
    }
  );

  async function onSubmit() {
    try {
      setIsLoading(true);
      const result = await refetch();
      console.log('Result', result);

      if (result.data) {
        router.push(`/join/${result.data.id}`);
      } else {
        toast.error('Ongeldige join code');
      }
    } catch {
      toast.error('Kon niet deelnemen aan de klas');
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col gap-4 items-center"
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Join Code</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                  className="text-6xl tracking-wider"
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Deelnemen...' : 'Deelnemen aan Klas'}
        </Button>
      </form>
    </Form>
  );
}
