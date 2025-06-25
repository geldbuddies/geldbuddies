import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateAge } from '@/lib/utils';
import useGameStore from '@/store/game/game-store';

export function PlayerStatus() {
  const { player, jobs, assets, goods, time, resetGame } = useGameStore();

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

  return (
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
  );
} 