'use client';

import { CharacterSelect } from '@/components/game/character-select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { calculateAge } from '@/lib/utils';
import useGameStore from '@/store/game/game-store';
import { useEffect } from 'react';

export default function GamePage() {
  const { player, jobs, assets, goods, time, resetGame } = useGameStore();

  // Initialize history on first render if empty
  useEffect(() => {
    const { history, addHistoryEvent } = useGameStore.getState();
    if (history.events.length === 0) {
      addHistoryEvent({
        type: 'life',
        description: `Nieuwe levenssimulatie gestart in ${time.monthName} ${time.year}`,
      });
    }
  }, [time]);

  // Calculate net worth
  const calculateNetWorth = () => {
    const assetsValue = assets.owned.reduce((total, asset) => total + asset.value, 0);
    const goodsValue = goods.owned.reduce((total, good) => total + good.resellValue, 0);
    return player.money + assetsValue + goodsValue;
  };

  // Calculate monthly income
  const calculateMonthlyIncome = () => {
    return jobs.currentJob ? Math.round(jobs.currentJob.salary / 12) : 0;
  };

  // Calculate monthly expenses
  const calculateMonthlyExpenses = () => {
    return goods.owned.reduce((total, good) => total + good.monthlyCost, 0);
  };

  // Handle game reset
  const handleReset = () => {
    if (confirm('Weet je zeker dat je opnieuw wilt beginnen? Alle voortgang gaat verloren.')) {
      resetGame();
    }
  };

  // If player is not initialized, show the character select screen
  if (!player.isInitialized) {
    return <CharacterSelect />;
  }

  // Otherwise, show the game content
  return (
    <div className="container mx-auto p-6 h-full">
      <div className="grid grid-cols-1 gap-6">
        {/* Player Information */}
        <Card className="sticky top-6">
          <CardHeader className="pb-2 flex flex-row justify-between">
            <div>
              <CardTitle className="text-2xl">
                {player.name},{' '}
                {calculateAge(player.birthMonth, player.birthYear, time.month, time.year)} jaar
              </CardTitle>
              <p className="text-muted-foreground">
                {time.monthName} {time.year}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleReset} className="self-start">
              Opnieuw beginnen
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Contant Geld</h3>
                <p className="text-2xl font-bold">€{player.money.toLocaleString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Totale vermogen</h3>
                <p className="text-2xl font-bold">€{calculateNetWorth().toLocaleString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Maandelijks Inkomen</h3>
                <p className="text-2xl font-bold">€{calculateMonthlyIncome().toLocaleString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Maandelijkse Uitgaven</h3>
                <p className="text-2xl font-bold">€{calculateMonthlyExpenses().toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Career Information */}
        <Tabs defaultValue="career" className="w-full">
          <TabsList className="grid grid-cols-3 w-full md:w-[400px] sticky top-[236px]">
            <TabsTrigger value="career">Carrière</TabsTrigger>
            <TabsTrigger value="assets">Bezittingen</TabsTrigger>
            <TabsTrigger value="lifestyle">Levensstijl</TabsTrigger>
          </TabsList>
          <TabsContent value="career" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Carrière</CardTitle>
              </CardHeader>
              <CardContent>
                {jobs.currentJob ? (
                  <div className="space-y-2">
                    <h3 className="font-medium">{jobs.currentJob.title}</h3>
                    <p className="text-muted-foreground">{jobs.currentJob.company}</p>
                    <p>Salaris: €{jobs.currentJob.salary.toLocaleString()} / jaar</p>
                    <p>
                      Maandelijks Inkomen: €
                      {Math.round(jobs.currentJob.salary / 12).toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <div className="text-muted-foreground">
                    <p>Je bent momenteel werkloos.</p>
                    <p>Gebruik het Carrière menu links om een baan te vinden.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="assets" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Bezittingen</CardTitle>
              </CardHeader>
              <CardContent>
                {assets.owned.length > 0 ? (
                  <div className="space-y-4">
                    {assets.owned.map((asset) => (
                      <div key={asset.id} className="border-b pb-3 last:border-0">
                        <h3 className="font-medium">{asset.name}</h3>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <div>
                            <p className="text-sm text-muted-foreground">Aankoopprijs</p>
                            <p>€{asset.purchasePrice.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Huidige Waarde</p>
                            <p>€{asset.value.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground">
                    <p>Je hebt nog geen bezittingen.</p>
                    <p>Gebruik het Financiën menu links om bezittingen te kopen.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="lifestyle" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Levensstijl</CardTitle>
              </CardHeader>
              <CardContent>
                {goods.owned.length > 0 ? (
                  <div className="space-y-4">
                    {goods.owned.map((good) => (
                      <div key={good.id} className="border-b pb-3 last:border-0">
                        <h3 className="font-medium">{good.name}</h3>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <div>
                            <p className="text-sm text-muted-foreground">Aankoopprijs</p>
                            <p>€{good.purchasePrice.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Doorverkoopwaarde</p>
                            <p>€{good.resellValue.toLocaleString()}</p>
                          </div>
                          {good.monthlyCost > 0 && (
                            <div className="col-span-2">
                              <p className="text-sm text-muted-foreground">Maandelijkse Kosten</p>
                              <p>€{good.monthlyCost.toLocaleString()}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground">
                    <p>Je hebt nog geen spullen.</p>
                    <p>Gebruik het Levensstijl menu links om spullen te kopen.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
