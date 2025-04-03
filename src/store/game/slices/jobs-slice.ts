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
      });

      // Add to history
      get().addHistoryEvent({
        type: 'job',
        description: `Ontslag genomen als ${currentJob.title} bij ${currentJob.company}`,
      });
    }
  },

  collectSalary: () => {
    const currentJob = get().jobs.currentJob;

    if (currentJob) {
      const monthlySalary = Math.round(currentJob.salary / 12);
      get().addMoney(monthlySalary, `Salaris van ${currentJob.company}`);

      // Add to history
      get().addHistoryEvent({
        type: 'transaction',
        description: `Salaris ontvangen van ${currentJob.company}`,
        amount: monthlySalary,
      });
    }
  },
});
