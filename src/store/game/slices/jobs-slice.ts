import { GameSlice, JobsSlice } from '../types';

export const createJobsSlice: GameSlice<JobsSlice> = (set, get) => ({
  jobs: {
    currentJob: null,
    availableJobs: [
      {
        id: '1',
        title: 'Retail Clerk',
        company: 'MegaMart',
        salary: 25000,
      },
      {
        id: '2',
        title: 'Office Assistant',
        company: 'Corporate Inc.',
        salary: 35000,
      },
      {
        id: '3',
        title: 'Software Developer',
        company: 'Tech Innovations',
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
      description: `Started new job as ${job.title} at ${job.company}`,
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
        description: `Quit job as ${currentJob.title} at ${currentJob.company}`,
      });
    }
  },

  collectSalary: () => {
    const currentJob = get().jobs.currentJob;

    if (currentJob) {
      const monthlySalary = Math.round(currentJob.salary / 12);
      get().addMoney(monthlySalary, `Salary from ${currentJob.company}`);
    }
  },
});
