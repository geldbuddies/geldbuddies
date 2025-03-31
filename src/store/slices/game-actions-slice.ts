import { v4 as uuidv4 } from 'uuid';
import { GameActionsSlice, GameSlice } from './types';

export const createGameActionsSlice: GameSlice<GameActionsSlice> = (set, get) => ({
  advanceDay: () => {
    // Decrease energy slightly
    const currentEnergy = get().player.stats.energy;
    get().updateStat('energy', Math.max(0, currentEnergy - 5));

    // Random chance to collect salary (simulating bi-weekly payments)
    if (Math.random() < 1 / 14) {
      // ~twice per month
      get().collectSalary();
    }

    // Add day passed event to history
    get().addHistoryEvent({
      type: 'life',
      description: 'A day passed',
      metadata: { stats: { ...get().player.stats } },
    });
  },

  resetGame: () =>
    set((state) => {
      // Reset player
      state.player = {
        money: 1000,
        name: 'Player',
        age: 18,
        stats: {
          health: 100,
          happiness: 70,
          energy: 100,
        },
      };

      // Reset jobs
      state.jobs = {
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
      };

      // Reset assets
      state.assets = {
        owned: [],
      };

      // Reset consumables
      state.consumables = {
        inventory: [],
      };

      // Reset history but add game start event
      state.history = {
        events: [
          {
            id: uuidv4(),
            type: 'life',
            description: 'Started new game',
            timestamp: Date.now(),
          },
        ],
      };
    }),
});
