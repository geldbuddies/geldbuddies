// src/store/useGameStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// Import slices
import { createAssetsSlice } from './slices/assets-slice';
import { createGoodsSlice } from './slices/goods-slice';
import { createHistorySlice } from './slices/history-slice';
import { createJobsSlice } from './slices/jobs-slice';
import { createPlayerSlice } from './slices/player-slice';
import { createTimeSlice } from './slices/time-slice';
import { GameStore } from './types';

// Function to reset the game
const resetGame = (set: (state: Partial<GameStore>) => void) => ({
  resetGame: () => {
    set({
      player: {
        money: 0,
        name: '',
        birthMonth: 1,
        birthYear: 2000,
        isInitialized: false,
        energy: 100,
        maxEnergy: 100,
      },
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
    });
  },
});

// Create main store with all slices
const useGameStore = create<GameStore>()(
  immer((...a) => ({
    ...createPlayerSlice(...a),
    ...createJobsSlice(...a),
    ...createAssetsSlice(...a),
    ...createGoodsSlice(...a),
    ...createHistorySlice(...a),
    ...createTimeSlice(...a),
    ...resetGame(a[0]),
  }))
);

export default useGameStore;
