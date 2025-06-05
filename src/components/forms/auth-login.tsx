"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { authClient } from '@/server/auth/auth-client';
import { useRouter } from 'next/navigation';

export function AuthLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      }, {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: async () => {
          // Get the user's role from the database
          const response = await fetch('/api/auth/user-role');
          if (response.ok) {
            const { role } = await response.json();
            // Redirect based on role
            if (role === 'Teacher') {
              router.push('/teacher-dashboard');
            } else if (role === 'Player') {
              router.push('/player-dashboard');
            } else {
              // Default fallback
              router.push('/dashboard');
            }
          } else {
            // If we can't get the role, redirect to a default page
            router.push('/dashboard');
          }
        },
        onError: (ctx) => {
          setError(ctx.error.message || 'Er is een fout opgetreden');
        },
      });

      if (error) {
        setError(error.message || 'Er is een fout opgetreden');
      }
    } catch (err) {
      setError('Er is een fout opgetreden bij het inloggen');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4">
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
            {error}
          </div>
        )}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="naam@voorbeeld.nl" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Wachtwoord</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <div className="animate-spin">⏳</div>
          ) : (
            "Inloggen"
          )}
        </Button>
      </div>
    </form>
  );
} 