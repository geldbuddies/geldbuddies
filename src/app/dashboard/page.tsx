'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welkom bij GeldBuddies</h1>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Account Setup</CardTitle>
          <CardDescription>Vul je profiel aan om te beginnen</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Het lijkt erop dat je account nog niet volledig is ingesteld. Kies hieronder of je een speler of docent bent om verder te gaan.</p>
          
          <div className="flex gap-4">
            <Button 
              onClick={() => router.push('/teacher-dashboard')}
              className="flex-1"
            >
              Ik ben een Docent
            </Button>
            <Button 
              onClick={() => router.push('/player-dashboard')}
              className="flex-1"
            >
              Ik ben een Speler
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 