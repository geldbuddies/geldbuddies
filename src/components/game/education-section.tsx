import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { calculateAge } from '@/lib/utils';
import useGameStore from '@/store/game/game-store';
import { availableEducations } from '@/store/game/slices/education-slice';
import { Education } from '@/store/game/types';
import { GraduationCap } from 'lucide-react';
import { toast } from 'sonner';

export function EducationSection() {
  const { player, time, education, startEducation, progressEducation } = useGameStore();

  // Get player's age
  const playerAge = calculateAge(player.birthMonth, player.birthYear, time.month, time.year);

  // Function to check if player meets requirements for an education
  const meetsRequirements = (edu: Education) => {
    if (edu.requirements?.minAge && playerAge < edu.requirements.minAge) {
      return false;
    }
    if (
      edu.requirements?.education &&
      !edu.requirements.education.every((req) => player.education.includes(req))
    ) {
      return false;
    }
    return true;
  };

  // Function to get education name by ID
  const getEducationName = (educationId: string) => {
    const education = availableEducations.find((e) => e.id === educationId);
    return education?.name || educationId;
  };

  // Function to handle starting education
  const handleStartEducation = (educationId: string) => {
    if (startEducation(educationId)) {
      toast.success('Opleiding gestart!');
    } else {
      toast.error('Kon opleiding niet starten. Controleer de vereisten en je saldo.');
    }
  };

  // Function to handle studying
  const handleStudy = () => {
    progressEducation();
  };

  return (
    <div className="space-y-6">
      {/* Current Education Status */}
      {education.currentEducation && (
        <Card>
          <CardHeader>
            <CardTitle>Huidige Opleiding</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const currentEdu = availableEducations.find(
                (e) => e.id === education.currentEducation?.educationId
              );
              if (!currentEdu) return null;

              const progress =
                (education.currentEducation.monthsCompleted / currentEdu.duration) * 100;

              return (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">{currentEdu.name}</h3>
                    <p className="text-sm text-muted-foreground">{currentEdu.description}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Voortgang</span>
                      <span>
                        {education.currentEducation.monthsCompleted} / {currentEdu.duration} maanden
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  <Button onClick={handleStudy} disabled={player.energy < currentEdu.energyCost}>
                    Studeren ({currentEdu.energyCost} energie)
                  </Button>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}

      {/* Available Educations */}
      <Card>
        <CardHeader>
          <CardTitle>Beschikbare Opleidingen</CardTitle>
          <CardDescription>Investeer in je toekomst met een opleiding</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Current Education List */}
            {player.education.length > 0 && (
              <div className="mb-6 p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Afgeronde Opleidingen:</h3>
                <ul className="list-disc list-inside">
                  {player.education.map((eduId) => (
                    <li key={eduId} className="text-sm">
                      {getEducationName(eduId)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Available Education List */}
            {availableEducations.map((edu) => {
              const isAvailable = meetsRequirements(edu);
              const hasCompleted = player.education.includes(edu.id);
              const isCurrentlyStudying =
                education.currentEducation?.educationId === edu.id;

              return (
                <div
                  key={edu.id}
                  className="flex items-start justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <GraduationCap
                        className={`h-5 w-5 ${
                          hasCompleted ? 'text-green-500' : 'text-blue-500'
                        }`}
                      />
                      <h3 className="font-medium">{edu.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{edu.description}</p>
                    <div className="text-sm">
                      <p>Kosten: €{edu.cost.toLocaleString()}</p>
                      <p>Duur: {edu.duration} maanden</p>
                      {edu.requirements?.minAge && (
                        <p>Minimum leeftijd: {edu.requirements.minAge} jaar</p>
                      )}
                      {edu.requirements?.education && (
                        <p>
                          Vereiste opleiding:{' '}
                          {edu.requirements.education
                            .map((req) => getEducationName(req))
                            .join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant={hasCompleted ? 'secondary' : 'default'}
                    disabled={
                      !isAvailable ||
                      hasCompleted ||
                      isCurrentlyStudying ||
                      education.currentEducation !== null
                    }
                    onClick={() => handleStartEducation(edu.id)}
                  >
                    {hasCompleted
                      ? 'Afgerond'
                      : isCurrentlyStudying
                      ? 'Bezig'
                      : 'Inschrijven'}
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 