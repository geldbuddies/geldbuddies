import { GameSlice, JobsSlice } from '../types';
import { jobs as availableJobs } from '@/data/jobs';
import { calculateAge } from '@/lib/utils';

export const createJobsSlice: GameSlice<JobsSlice> = (set, get) => ({
  jobs: {
    currentJob: null,
    availableJobs,
    hoursWorked: 0,
    maxHoursWorked: 160,
    filters: {
      search: '',
      category: 'all',
      level: 'all',
      minSalary: 0,
      location: '',
    },
  },

  setJobFilters: (filters) => {
    set((state) => {
      state.jobs.filters = { ...state.jobs.filters, ...filters };
    });
  },

  applyForJob: (jobId) => {
    const job = get().jobs.availableJobs.find((j) => j.id === jobId);
    if (!job) return;

    // Check if player meets requirements
    const player = get().player;
    const playerAge = calculateAge(player.birthMonth, player.birthYear, get().time.month, get().time.year);

    if (job.requirements.minAge && playerAge < job.requirements.minAge) {
      get().addHistoryEvent({
        type: 'job',
        description: `Sollicitatie afgewezen: Je bent te jong voor deze functie (minimum leeftijd: ${job.requirements.minAge})`,
      });
      return;
    }

    set((state) => {
      state.jobs.currentJob = job;
      state.jobs.hoursWorked = 0;
    });

    // Add to history
    get().addHistoryEvent({
      type: 'job',
      description: `Nieuwe baan gestart als ${job.title} bij ${job.company}`,
    });
  },

  quitJob: () => {
    const currentJob = get().jobs.currentJob;

    if (currentJob) {
      set((state) => {
        state.jobs.currentJob = null;
        state.jobs.hoursWorked = 0;
      });

      // Add to history
      get().addHistoryEvent({
        type: 'job',
        description: `Ontslag genomen als ${currentJob.title} bij ${currentJob.company}`,
      });
    }
  },

  addHoursWorked: (hours) => {
    if (!get().jobs.currentJob) return false;

    set((state) => {
      state.jobs.hoursWorked = Math.min(state.jobs.hoursWorked + hours, state.jobs.maxHoursWorked);
    });

    return true;
  },

  collectSalary: () => {
    const currentJob = get().jobs.currentJob;
    const hoursWorked = get().jobs.hoursWorked;

    if (currentJob && hoursWorked > 0) {
      // Calculate salary based on worked hours
      const hourlyRate = currentJob.salary / (12 * get().jobs.maxHoursWorked);
      const monthlySalary = Math.round(hourlyRate * hoursWorked);

      get().addMoney(monthlySalary, `Salaris van ${currentJob.company}`);

      // Add to history
      get().addHistoryEvent({
        type: 'transaction',
        description: `Salaris ontvangen voor ${hoursWorked} uur werk bij ${currentJob.company}`,
        amount: monthlySalary,
      });

      // Reset work hours for the new month
      set((state) => {
        state.jobs.hoursWorked = 0;
      });
    }
  },
});
