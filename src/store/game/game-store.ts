// src/store/useGameStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Import slices
import { createAssetsSlice } from './slices/assets-slice';
import { createGoodsSlice } from './slices/goods-slice';
import { createHistorySlice } from './slices/history-slice';
import { createJobsSlice } from './slices/jobs-slice';
import { createPlayerSlice } from './slices/player-slice';
import { createTimeSlice } from './slices/time-slice';
import { GameStore } from './types';

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
    })),
    {
      name: 'life-sim-storage',
      partialize: (state) => ({
        player: state.player,
        jobs: state.jobs,
        assets: state.assets,
        goods: state.goods,
        history: state.history,
        time: state.time,
      }),
    }
  )
);

export default useGameStore;
