// src/store/useGameStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Import slices
import { createAssetsSlice } from './slices/assets-slice';
import { createConsumablesSlice } from './slices/consumables-slice';
import { createGameActionsSlice } from './slices/game-actions-slice';
import { createHistorySlice } from './slices/history-slice';
import { createJobsSlice } from './slices/jobs-slice';
import { createPlayerSlice } from './slices/player-slice';
import { GameStore } from './slices/types';

// Create main store with all slices
const useGameStore = create<GameStore>()(
  persist(
    immer((...a) => ({
      ...createPlayerSlice(...a),
      ...createJobsSlice(...a),
      ...createAssetsSlice(...a),
      ...createConsumablesSlice(...a),
      ...createHistorySlice(...a),
      ...createGameActionsSlice(...a),
    })),
    {
      name: 'bitlife-game-storage',
      partialize: (state) => ({
        player: state.player,
        jobs: state.jobs,
        assets: state.assets,
        consumables: state.consumables,
        history: state.history,
      }),
    }
  )
);

export default useGameStore;
