import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import useGameStore from '@/store/game/game-store';

export function FinanceSection() {
  const { player, goods, assets, jobs } = useGameStore();

  // Function to calculate monthly salary based on hours worked
  const calculateMonthlySalary = () => {
    if (!jobs.currentJob) return 0;

    const hourlyRate = jobs.currentJob.salary / (12 * jobs.maxHoursWorked);
    return Math.round(hourlyRate * jobs.hoursWorked);
  };

  const monthlyExpenses = goods.owned.reduce((total, good) => total + good.monthlyCost, 0);
  const monthlyIncome = calculateMonthlySalary();
  const netMonthly = monthlyIncome - monthlyExpenses;

  return (
    <div className="space-y-4">
      <Card className="relative overflow-hidden bg-gradient-to-br from-background to-muted/50 backdrop-blur-sm border-muted/50 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-50" />
        <CardHeader className="relative">
          <CardTitle>Financieel Overzicht</CardTitle>
          <CardDescription>Bekijk je financiële situatie</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg bg-muted/30 backdrop-blur-sm">
                <h3 className="font-medium text-muted-foreground">Huidig Saldo</h3>
                <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                  €{player.money.toLocaleString()}
                </p>
              </div>

              <div className="p-4 border rounded-lg bg-muted/30 backdrop-blur-sm">
                <h3 className="font-medium text-muted-foreground">Maandelijks Inkomen</h3>
                <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                  €{monthlyIncome.toLocaleString()}
                </p>
              </div>

              <div className="p-4 border rounded-lg bg-muted/30 backdrop-blur-sm">
                <h3 className="font-medium text-muted-foreground">Maandelijkse Uitgaven</h3>
                <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                  €{monthlyExpenses.toLocaleString()}
                </p>
              </div>

              <div className="p-4 border rounded-lg bg-muted/30 backdrop-blur-sm">
                <h3 className="font-medium text-muted-foreground">Netto per Maand</h3>
                <p
                  className={`text-2xl font-bold ${
                    netMonthly >= 0
                      ? 'bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-600'
                      : 'bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600'
                  }`}
                >
                  €{netMonthly.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-muted/30 backdrop-blur-sm">
              <h3 className="font-medium mb-2">Totale Bezittingen</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Contant geld</span>
                  <span className="font-medium">€{player.money.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Waarde bezittingen</span>
                  <span className="font-medium">
                    €
                    {goods.owned
                      .reduce((total, good) => total + good.resellValue, 0)
                      .toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Waarde investeringen</span>
                  <span className="font-medium">
                    €
                    {assets.owned.reduce((total, asset) => total + asset.value, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2 font-bold">
                  <span>Totaal vermogen</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                    €
                    {(
                      player.money +
                      goods.owned.reduce((total, good) => total + good.resellValue, 0) +
                      assets.owned.reduce((total, asset) => total + asset.value, 0)
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden bg-gradient-to-br from-background to-muted/50 backdrop-blur-sm border-muted/50 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-50" />
        <CardHeader className="relative">
          <CardTitle>Recente Transacties</CardTitle>
          <CardDescription>Bekijk je recente financiële activiteiten</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <ScrollArea className="h-[300px] pr-4">
            {useGameStore
              .getState()
              .history.events.filter((event) => event.amount !== undefined)
              .slice(0, 10)
              .map((event) => (
                <div
                  key={event.id}
                  className="flex justify-between items-center py-2 border-b last:border-0 hover:bg-muted/30 transition-colors rounded-lg px-2"
                >
                  <div>
                    <p className="font-medium">{event.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(
                        Math.floor(event.timestamp / 10000),
                        (Math.floor(event.timestamp / 100) % 100) - 1
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`font-medium ${
                      event.amount && event.amount >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {event.amount && event.amount >= 0 ? '+' : ''}€
                    {event.amount?.toLocaleString() || 0}
                  </span>
                </div>
              ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
