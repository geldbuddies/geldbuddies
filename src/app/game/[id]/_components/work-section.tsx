import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useGameStore from '@/store/game/game-store';
import { toast } from 'sonner';

export function WorkSection() {
  const { player, jobs, consumeEnergy, addHoursWorked, addHistoryEvent, applyForJob, quitJob } =
    useGameStore();

  // Function to handle working at current job
  const handleWork = (hours: number) => {
    const energyCost = hours * 2; // 2 energy per hour worked

    if (consumeEnergy(energyCost)) {
      // Track hours worked this month for salary calculation
      addHoursWorked(hours);

      // Add history event for working
      addHistoryEvent({
        type: 'job',
        description: `Gewerkt voor ${hours} uur bij ${jobs.currentJob?.company}`,
      });

      toast.success(`Je hebt ${hours} uur gewerkt bij ${jobs.currentJob?.company}`);
    } else {
      toast.error('Niet genoeg energie!');
    }
  };

  // Function to calculate monthly salary based on hours worked
  const calculateMonthlySalary = () => {
    if (!jobs.currentJob) return 0;

    const hourlyRate = jobs.currentJob.salary / (12 * jobs.maxHoursWorked);
    return Math.round(hourlyRate * jobs.hoursWorked);
  };

  return (
    <div className="space-y-4">
      <Card className="relative overflow-hidden bg-gradient-to-br from-background to-muted/50 backdrop-blur-sm border-muted/50 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-50" />
        <CardHeader className="relative">
          <CardTitle>Huidige Baan</CardTitle>
          <CardDescription>Beheer je huidige baan of zoek een nieuwe</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          {jobs.currentJob ? (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/30 backdrop-blur-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                      {jobs.currentJob.title}
                    </h3>
                    <p className="text-muted-foreground">{jobs.currentJob.company}</p>
                    <p className="mt-1">
                      <span className="font-medium">Salaris:</span> €
                      {jobs.currentJob.salary.toLocaleString()}/jaar
                    </p>
                    <div className="mt-2">
                      <p className="text-sm">
                        <span className="font-medium">Gewerkte uren deze maand:</span>{' '}
                        {jobs.hoursWorked}/{jobs.maxHoursWorked}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Verwacht salaris deze maand:</span> €
                        {calculateMonthlySalary().toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => quitJob()}
                    className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
                  >
                    Ontslag nemen
                  </Button>
                </div>

                <div className="mt-4 border-t pt-4">
                  <h4 className="font-medium mb-2">Werken</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleWork(4)}
                      disabled={player.energy < 8 || jobs.hoursWorked >= jobs.maxHoursWorked}
                      className="bg-primary/5 hover:bg-primary/10"
                    >
                      Werk 4 uur (8 energie)
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleWork(8)}
                      disabled={player.energy < 16 || jobs.hoursWorked >= jobs.maxHoursWorked}
                      className="bg-primary/5 hover:bg-primary/10"
                    >
                      Werk 8 uur (16 energie)
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground mb-4">Je hebt momenteel geen baan</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden bg-gradient-to-br from-background to-muted/50 backdrop-blur-sm border-muted/50 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-50" />
        <CardHeader className="relative">
          <CardTitle>Beschikbare Banen</CardTitle>
          <CardDescription>Bekijk en solliciteer naar beschikbare banen</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <div className="space-y-4">
            {jobs.availableJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 border rounded-lg bg-muted/30 backdrop-blur-sm hover:bg-muted/40 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                      {job.title}
                    </h3>
                    <p className="text-muted-foreground">{job.company}</p>
                    <p className="mt-1">€{job.salary.toLocaleString()}/jaar</p>
                  </div>
                  <Button onClick={() => applyForJob(job.id)} disabled={!!jobs.currentJob}>
                    Solliciteren
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
