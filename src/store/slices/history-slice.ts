import { v4 as uuidv4 } from 'uuid';
import { GameSlice, HistorySlice } from './types';

export const createHistorySlice: GameSlice<HistorySlice> = (set) => ({
  history: {
    events: [],
  },

  addHistoryEvent: (event) =>
    set((state) => {
      // Add new event at the beginning of the array for chronological display
      state.history.events.unshift({
        ...event,
        id: uuidv4(),
        timestamp: Date.now(),
      });

      // Limit history to 100 events for performance
      if (state.history.events.length > 100) {
        state.history.events = state.history.events.slice(0, 100);
      }
    }),
});
