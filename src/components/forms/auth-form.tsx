'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

export function AuthForm() {
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(event: React.FormEvent) {
      event.preventDefault();
      setIsLoading(true);
  
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  
    return (
      <div className="container mx-auto flex min-h-screen w-full items-center justify-center px-4 py-8">
        <Card className="w-full max-w-[450px] sm:w-[400px] md:w-[450px] lg:w-[500px]">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl sm:text-3xl">Welkom bij GeldBuddies</CardTitle>
            <CardDescription className="text-base sm:text-lg">Log in of maak een account aan</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 p-0.5">
                <TabsTrigger value="login" className="text-base">Inloggen</TabsTrigger>
                <TabsTrigger value="register" className="text-base">Account Aanmaken</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={onSubmit}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="naam@voorbeeld.nl" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Wachtwoord</Label>
                      <Input id="password" type="password" />
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
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={onSubmit}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Naam</Label>
                      <Input id="name" type="text" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="naam@voorbeeld.nl" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Wachtwoord</Label>
                      <Input id="password" type="password" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirmPassword">Bevestig Wachtwoord</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <div className="animate-spin">⏳</div>
                      ) : (
                        "Account Aanmaken"
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    );
}