'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function PlayerDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Speler Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mijn Balans</CardTitle>
            <CardDescription>Huidige saldo en transacties</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">€0.00</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mijn Status</CardTitle>
            <CardDescription>Huidige spelstatus</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Niet actief in een spel</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mijn Profiel</CardTitle>
            <CardDescription>Persoonlijke informatie</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Bekijk en bewerk je profiel</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 