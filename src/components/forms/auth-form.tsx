"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuthLogin } from '@/components/forms/auth-login';
import { AuthAccount } from '@/components/forms/auth-account';

export function AuthForm() {

    return (
      <>
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
                <AuthLogin />
              </TabsContent>
              <TabsContent value="register">
                <AuthAccount />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      </>
    );
}