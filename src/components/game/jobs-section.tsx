'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { JobCategory, JobLevel } from '@/data/jobs';
import { calculateAge } from '@/lib/utils';
import useGameStore from '@/store/game/game-store';
import { useState } from 'react';
import { JobDetailsDialog } from './job-details-dialog';

export function JobsSection() {
  const { jobs, player, time, setJobFilters, applyForJob } = useGameStore();
  const [selectedJob, setSelectedJob] = useState<(typeof jobs.availableJobs)[0] | null>(null);

  // Filter jobs based on current filters
  const filteredJobs = jobs.availableJobs.filter((job) => {
    const matchesSearch =
      jobs.filters.search === '' ||
      job.title.toLowerCase().includes(jobs.filters.search.toLowerCase()) ||
      job.company.toLowerCase().includes(jobs.filters.search.toLowerCase()) ||
      job.description.toLowerCase().includes(jobs.filters.search.toLowerCase());

    const matchesCategory =
      jobs.filters.category === 'all' || job.category === jobs.filters.category;
    const matchesLevel = jobs.filters.level === 'all' || job.level === jobs.filters.level;
    const matchesSalary = job.salary >= jobs.filters.minSalary;
    const matchesLocation =
      jobs.filters.location === '' ||
      job.location.toLowerCase().includes(jobs.filters.location.toLowerCase());

    return matchesSearch && matchesCategory && matchesLevel && matchesSalary && matchesLocation;
  });

  // Calculate player's age
  const playerAge = calculateAge(player.birthMonth, player.birthYear, time.month, time.year);

  // Calculate total work experience
  const calculateTotalExperience = () => {
    return (
      player.workExperience?.reduce((total, exp) => {
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
      }, 0) || 0
    );
  };

  const totalExperience = calculateTotalExperience();

  // Check if player meets job requirements
  const checkJobRequirements = (job: (typeof jobs.availableJobs)[0]) => {
    const requirements = [];

    // Check age
    if (job.requirements.minAge && playerAge < job.requirements.minAge) {
      requirements.push(`Minimum leeftijd: ${job.requirements.minAge} jaar`);
    }

    // Check education
    if (job.requirements.education && !player.education?.includes(job.requirements.education)) {
      requirements.push(`Opleiding: ${job.requirements.education}`);
    }

    return requirements;
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Zoek een baan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Zoeken</label>
              <Input
                placeholder="Zoek op titel, bedrijf of beschrijving"
                value={jobs.filters.search}
                onChange={(e) => setJobFilters({ search: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Categorie</label>
              <Select
                value={jobs.filters.category}
                onValueChange={(value) => setJobFilters({ category: value as JobCategory | 'all' })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle categorieën</SelectItem>
                  <SelectItem value="tech">Technologie</SelectItem>
                  <SelectItem value="finance">Financieel</SelectItem>
                  <SelectItem value="healthcare">Gezondheidszorg</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="education">Onderwijs</SelectItem>
                  <SelectItem value="hospitality">Horeca</SelectItem>
                  <SelectItem value="creative">Creatief</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Niveau</label>
              <Select
                value={jobs.filters.level}
                onValueChange={(value) => setJobFilters({ level: value as JobLevel | 'all' })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle niveaus</SelectItem>
                  <SelectItem value="entry">Entry level</SelectItem>
                  <SelectItem value="junior">Junior</SelectItem>
                  <SelectItem value="medior">Medior</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Minimum salaris</label>
              <Input
                type="number"
                placeholder="Minimum salaris per jaar"
                value={jobs.filters.minSalary || ''}
                onChange={(e) =>
                  setJobFilters({ minSalary: e.target.value ? parseInt(e.target.value) : 0 })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Locatie</label>
              <Input
                placeholder="Zoek op locatie"
                value={jobs.filters.location}
                onChange={(e) => setJobFilters({ location: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.map((job) => {
          const missingRequirements = checkJobRequirements(job);
          const canApply = missingRequirements.length === 0;

          return (
            <div
              key={job.id}
              className="cursor-pointer"
              onClick={() => setSelectedJob(job)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedJob(job);
                }
              }}
            >
              <Card
                className={`${
                  !canApply ? 'opacity-60' : ''
                } hover:bg-accent/50 transition-colors h-full border-2 hover:border-primary`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <p className="text-muted-foreground">{job.company}</p>
                    </div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        applyForJob(job.id);
                      }}
                      disabled={!canApply || jobs.currentJob?.id === job.id}
                    >
                      {jobs.currentJob?.id === job.id ? 'Huidige baan' : 'Solliciteer'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>{job.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Salaris</p>
                        <p>€{job.salary.toLocaleString()} / jaar</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Locatie</p>
                        <p>{job.location}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Niveau</p>
                        <p className="capitalize">{job.level}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Categorie</p>
                        <p className="capitalize">{job.category}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Vereisten</p>
                      <div className="space-y-2">
                        {job.requirements.minAge && (
                          <Badge
                            variant={
                              job.requirements.minAge && playerAge < job.requirements.minAge
                                ? 'destructive'
                                : 'outline'
                            }
                          >
                            Minimum leeftijd: {job.requirements.minAge} jaar
                          </Badge>
                        )}
                        {job.requirements.education && (
                          <Badge
                            variant={
                              !player.education?.includes(job.requirements.education)
                                ? 'destructive'
                                : 'outline'
                            }
                          >
                            Opleiding: {job.requirements.education}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Job Details Dialog */}
      {selectedJob && (
        <JobDetailsDialog job={selectedJob} isOpen={true} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
}
