import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import useGameStore from '@/store/game/game-store';
import { Briefcase } from 'lucide-react';
import { toast } from 'sonner';

export function WorkSection() {
  const { jobs, player, addHoursWorked } = useGameStore();

  // Handle working
  const handleWork = () => {
    if (addHoursWorked(8)) {
      toast.success('Je hebt 8 uur gewerkt!');
    } else {
      toast.error('Je kunt niet meer werken deze maand.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Job Status */}
      {jobs.currentJob && (
        <Card>
          <CardHeader>
            <CardTitle>Huidige Baan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">{jobs.currentJob.title}</h3>
                <p className="text-sm text-muted-foreground">{jobs.currentJob.company}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Gewerkte uren deze maand</span>
                  <span>
                    {jobs.hoursWorked} / {jobs.maxHoursWorked} uren
                  </span>
                </div>
                <Progress
                  value={(jobs.hoursWorked / jobs.maxHoursWorked) * 100}
                  className="h-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Jaarsalaris</p>
                  <p className="font-medium">€{jobs.currentJob.salary.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Maandsalaris</p>
                  <p className="font-medium">
                    €{Math.round(jobs.currentJob.salary / 12).toLocaleString()}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleWork}
                disabled={jobs.hoursWorked >= jobs.maxHoursWorked || player.energy < 20}
                className="w-full"
              >
                Werk een dag (8 uur, kost 20 energie)
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Jobs */}
      <Card>
        <CardHeader>
          <CardTitle>Beschikbare Banen</CardTitle>
          <CardDescription>Vind een nieuwe baan om je carrière te starten of verbeteren</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobs.availableJobs.map((job) => (
              <div key={job.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-blue-500" />
                    <h3 className="font-medium">{job.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                  <p className="text-sm">Salaris: €{job.salary.toLocaleString()} / jaar</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // TODO: Implement job application logic
                    toast.info('Deze functie is nog niet beschikbaar.');
                  }}
                >
                  Solliciteren
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 