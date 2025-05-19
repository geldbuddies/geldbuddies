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
import { api, type RouterOutputs } from '@/trpc/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
  code: z.string().length(6, 'Join code must be 6 characters'),
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const result = await refetch();

      if (result.data) {
        router.push(`/join/${result.data.id}`);
      } else {
        toast.error('Invalid join code');
      }
    } catch (error) {
      toast.error('Failed to join classroom');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Join Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter 6-character code"
                  {...field}
                  className="text-center tracking-widest uppercase"
                  maxLength={6}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Joining...' : 'Join Classroom'}
        </Button>
      </form>
    </Form>
  );
}
