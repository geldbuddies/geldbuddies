import { GameSlice, JobsSlice } from './types';

export const createJobsSlice: GameSlice<JobsSlice> = (set, get) => ({
  jobs: {
    currentJob: null,
    availableJobs: [
      {
        id: '1',
        title: 'Cashier',
        company: 'Local Store',
        salary: 20000,
      },
      {
        id: '2',
        title: 'Office Assistant',
        company: 'Corporate Inc.',
        salary: 30000,
      },
      {
        id: '3',
        title: 'Junior Developer',
        company: 'Tech Startup',
        salary: 50000,
        requirements: {
          intelligence: 70,
        },
      },
    ],
  },

  applyForJob: (jobId) => {
    const job = get().jobs.availableJobs.find((j) => j.id === jobId);
    if (!job) return false;

    // Check requirements if they exist
    if (job.requirements) {
      for (const [stat, value] of Object.entries(job.requirements)) {
        if ((get().player.stats as any)[stat] < value) {
          return false;
        }
      }
    }

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
      subtype: 'hired',
      description: `Started new job as ${job.title} at ${job.company}`,
      metadata: { jobTitle: job.title, company: job.company, salary: job.salary },
    });

    return true;
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
        subtype: 'quit',
        description: `Quit job as ${currentJob.title} at ${currentJob.company}`,
        metadata: { jobTitle: currentJob.title, company: currentJob.company },
      });
    }
  },

  collectSalary: () => {
    const currentJob = get().jobs.currentJob;

    if (currentJob) {
      const monthlySalary = currentJob.salary / 12;
      get().addMoney(monthlySalary, `Salary from ${currentJob.company}`);
    }
  },
});
