// src/store/useGameStore.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Import slices
import { createAssetsSlice } from './slices/assets-slice';
import { availableEducations, createEducationSlice } from './slices/education-slice';
import { createGoodsSlice } from './slices/goods-slice';
import { createHistorySlice } from './slices/history-slice';
import { createInvestmentsSlice, initialStocks } from './slices/investments-slice';
import { createJobsSlice } from './slices/jobs-slice';
import { createPlayerSlice } from './slices/player-slice';
import { createTimeSlice } from './slices/time-slice';
import { GameStore, Stock } from './types';

// Function to reset the game
const resetGame = (set: (state: Partial<GameStore>) => void) => ({
  resetGame: () => {
    const currentTime = Date.now();
    set({
      player: {
        money: 0,
        name: '',
        birthMonth: 1,
        birthYear: 2000,
        isInitialized: false,
        energy: 100,
        maxEnergy: 100,
        education: [],
        skills: [],
        workExperience: [],
      },
      jobs: {
        currentJob: null,
        availableJobs: [],
        filters: {
          search: '',
          category: 'all',
          level: 'all',
          minSalary: 0,
          location: '',
        },
        hoursWorked: 0,
        maxHoursWorked: 160,
      },
      assets: {
        owned: [],
      },
      goods: {
        owned: [],
      },
      history: {
        events: [],
      },
      time: {
        month: 1,
        year: 2025,
        monthName: 'Januari',
      },
      investments: {
        stocks: initialStocks.map((stock: Stock) => ({
          ...stock,
          priceHistory: [{ timestamp: currentTime, price: stock.currentPrice }],
        })),
        portfolio: [],
      },
      education: {
        currentEducation: null,
        availableEducations: availableEducations,
      },
    });
  },
});

// Create main store with all slices
const useGameStore = create<GameStore>()(
  persist(
    immer((...a) => ({
      ...createPlayerSlice(...a),
      ...createJobsSlice(...a),
      ...createAssetsSlice(...a),
      ...createGoodsSlice(...a),
      ...createHistorySlice(...a),
      ...createTimeSlice(...a),
      ...createInvestmentsSlice(...a),
      ...createEducationSlice(...a),
      ...resetGame(a[0]),
    })),
    {
      name: 'game-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useGameStore;
