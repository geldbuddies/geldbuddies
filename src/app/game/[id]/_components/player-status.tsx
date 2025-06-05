import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import useGameStore from '@/store/game/game-store';
import { Activity, Briefcase, Wallet } from 'lucide-react';

export function PlayerStatus() {
  const { player, jobs } = useGameStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="relative overflow-hidden bg-gradient-to-br from-background to-muted/50 backdrop-blur-sm border-muted/50 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-50" />
        <CardHeader className="pb-2 relative">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Financiën</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            €{player.money.toLocaleString()}
          </div>
          <p className="text-sm text-muted-foreground">Beschikbaar saldo</p>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden bg-gradient-to-br from-background to-muted/50 backdrop-blur-sm border-muted/50 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-50" />
        <CardHeader className="pb-2 relative">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Werk</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="relative">
          {jobs.currentJob ? (
            <>
              <div className="font-semibold">{jobs.currentJob.title}</div>
              <p className="text-sm text-muted-foreground">{jobs.currentJob.company}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {jobs.hoursWorked}/{jobs.maxHoursWorked} uur deze maand
                </span>
              </div>
            </>
          ) : (
            <p className="text-muted-foreground">Geen baan</p>
          )}
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden bg-gradient-to-br from-background to-muted/50 backdrop-blur-sm border-muted/50 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-50" />
        <CardHeader className="pb-2 relative">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Energie</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              {player.energy}/{player.maxEnergy}
            </span>
          </div>
          <Progress value={(player.energy / player.maxEnergy) * 100} className="h-2 bg-muted/50" />
          <p className="mt-2 text-xs text-muted-foreground">
            Energie wordt gebruikt voor activiteiten en wordt hersteld wanneer je voortgang wordt
            opgeslagen
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
