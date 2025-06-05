import { GameSlice, JobsSlice } from '../types';

export const createJobsSlice: GameSlice<JobsSlice> = (set, get) => ({
  jobs: {
    currentJob: null,
    availableJobs: [
      {
        id: '1',
        title: 'Winkelmedewerker',
        company: 'SuperMarkt',
        salary: 25000,
      },
      {
        id: '2',
        title: 'Kantoorassistent',
        company: 'Zakelijk B.V.',
        salary: 35000,
      },
      {
        id: '3',
        title: 'Software Ontwikkelaar',
        company: 'Tech Innovaties',
        salary: 80000,
      },
    ],
    hoursWorked: 0,
    maxHoursWorked: 160,
  },

  applyForJob: (jobId) => {
    const job = get().jobs.availableJobs.find((j) => j.id === jobId);
    if (!job) return;

    set((state) => {
      state.jobs.currentJob = {
        title: job.title,
        company: job.company,
        salary: job.salary,
      };
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
    console.log(hours);

    set((state) => {
      state.jobs.hoursWorked = Math.min(state.jobs.hoursWorked + hours, state.jobs.maxHoursWorked);
    });

    console.log(get().jobs.hoursWorked, get().jobs.maxHoursWorked);

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
