'use client';

import { Job } from '@/data/jobs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { calculateAge } from '@/lib/utils';
import useGameStore from '@/store/game/game-store';

interface JobDetailsDialogProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

export function JobDetailsDialog({ job, isOpen, onClose }: JobDetailsDialogProps) {
  const { player, time, applyForJob, jobs } = useGameStore();

  // Calculate player's age
  const playerAge = calculateAge(player.birthMonth, player.birthYear, time.month, time.year);

  // Calculate total work experience
  const calculateTotalExperience = () => {
    return player.workExperience?.reduce((total, exp) => {
      if (!exp.endDate) {
        const currentDate = { month: time.month, year: time.year };
        return (
          total +
          (currentDate.year - exp.startDate.year + (currentDate.month - exp.startDate.month) / 12)
        );
      }
      return (
        total +
        (exp.endDate.year - exp.startDate.year + (exp.endDate.month - exp.startDate.month) / 12)
      );
    }, 0) || 0;
  };

  const totalExperience = calculateTotalExperience();

  // Check requirements status
  const meetsAgeRequirement = !job.requirements.minAge || playerAge >= job.requirements.minAge;
  const meetsEducationRequirement =
    !job.requirements.education || player.education?.includes(job.requirements.education);
  const meetsExperienceRequirement =
    !job.requirements.experience || totalExperience >= job.requirements.experience;
  const missingSkills =
    job.requirements.skills?.filter((skill) => !player.skills?.includes(skill)) || [];
  const meetsSkillsRequirement = missingSkills.length === 0;

  const canApply =
    meetsAgeRequirement &&
    meetsEducationRequirement &&
    meetsExperienceRequirement &&
    meetsSkillsRequirement;

  // Calculate monthly and hourly salary
  const monthlySalary = Math.round(job.salary / 12);
  const hourlyRate = Math.round((job.salary / 12) / jobs.maxHoursWorked);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{job.title}</DialogTitle>
          <DialogDescription className="text-lg font-medium">{job.company}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Salary Information */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Salaris</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Per jaar</p>
                <p className="text-2xl font-bold">€{job.salary.toLocaleString()}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Per maand</p>
                <p className="text-2xl font-bold">€{monthlySalary.toLocaleString()}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Per uur</p>
                <p className="text-2xl font-bold">€{hourlyRate.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Functieomschrijving</h3>
            <p>{job.description}</p>
          </div>

          {/* Job Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-1">Niveau</h3>
              <p className="capitalize">{job.level}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-1">Categorie</h3>
              <p className="capitalize">{job.category}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-1">Locatie</h3>
              <p>{job.location}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-1">Werkuren</h3>
              <p>{jobs.maxHoursWorked} uur per maand</p>
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Vereisten</h3>
            <div className="space-y-4">
              {/* Age Requirement */}
              {job.requirements.minAge && (
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">Leeftijd</h4>
                    <Badge variant={meetsAgeRequirement ? 'outline' : 'destructive'}>
                      {meetsAgeRequirement ? 'Voldaan' : 'Niet voldaan'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Minimum leeftijd: {job.requirements.minAge} jaar
                    {!meetsAgeRequirement && ` (Je bent ${playerAge} jaar)`}
                  </p>
                </div>
              )}

              {/* Education Requirement */}
              {job.requirements.education && (
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">Opleiding</h4>
                    <Badge variant={meetsEducationRequirement ? 'outline' : 'destructive'}>
                      {meetsEducationRequirement ? 'Voldaan' : 'Niet voldaan'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{job.requirements.education}</p>
                </div>
              )}

              {/* Experience Requirement */}
              {job.requirements.experience !== undefined && job.requirements.experience > 0 && (
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">Werkervaring</h4>
                    <Badge variant={meetsExperienceRequirement ? 'outline' : 'destructive'}>
                      {meetsExperienceRequirement ? 'Voldaan' : 'Niet voldaan'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {job.requirements.experience} jaar ervaring vereist
                    {!meetsExperienceRequirement &&
                      ` (Je hebt ${totalExperience.toFixed(1)} jaar ervaring)`}
                  </p>
                </div>
              )}

              {/* Skills Requirements */}
              {job.requirements.skills && job.requirements.skills.length > 0 && (
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">Vaardigheden</h4>
                    <Badge variant={meetsSkillsRequirement ? 'outline' : 'destructive'}>
                      {meetsSkillsRequirement ? 'Voldaan' : 'Niet voldaan'}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {job.requirements.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={player.skills?.includes(skill) ? 'outline' : 'destructive'}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Apply Button */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Sluiten
            </Button>
            <Button
              onClick={() => {
                applyForJob(job.id);
                onClose();
              }}
              disabled={!canApply || jobs.currentJob?.id === job.id}
            >
              {jobs.currentJob?.id === job.id ? 'Huidige baan' : 'Solliciteer'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 