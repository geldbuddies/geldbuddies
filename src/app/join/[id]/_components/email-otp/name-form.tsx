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
import { api } from '@/trpc/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const nameSchema = z.object({
  name: z.string().min(2, 'Naam moet minimaal 2 karakters bevatten'),
});

export function NameForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const updateName = api.user.updateName.useMutation({
    onSuccess: () => {
      toast.success('Naam succesvol opgeslagen');
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message || 'Er ging iets mis bij het opslaan van je naam');
    },
  });

  const form = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof nameSchema>) {
    try {
      setIsLoading(true);
      await updateName.mutateAsync({ name: values.name });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welkom bij GeldBuddies!</h1>
          <p className="text-sm text-muted-foreground">Vul je naam in om verder te gaan</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Naam</FormLabel>
                  <FormControl>
                    <Input placeholder="Jouw naam" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Bezig...' : 'Doorgaan'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
