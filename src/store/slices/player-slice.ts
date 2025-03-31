import { GameSlice, PlayerSlice } from './types';

export const createPlayerSlice: GameSlice<PlayerSlice> = (set, get) => ({
  player: {
    money: 1000,
    name: 'Player',
    age: 18,
    stats: {
      health: 100,
      happiness: 70,
      energy: 100,
    },
  },

  addMoney: (amount, reason) => {
    set((state) => {
      state.player.money += amount;
    });

    // Add to history
    get().addHistoryEvent({
      type: 'transaction',
      subtype: 'income',
      description: `Received $${amount.toLocaleString()} - ${reason}`,
      metadata: { amount },
    });
  },

  spendMoney: (amount, reason) => {
    if (get().player.money >= amount) {
      set((state) => {
        state.player.money -= amount;
      });

      // Add to history
      get().addHistoryEvent({
        type: 'transaction',
        subtype: 'expense',
        description: `Spent $${amount.toLocaleString()} - ${reason}`,
        metadata: { amount },
      });

      return true;
    }
    return false;
  },

  updateStat: (stat, value) => {
    set((state) => {
      if (stat in state.player.stats) {
        // Ensure stats stay within 0-100 range
        (state.player.stats as any)[stat] = Math.max(0, Math.min(100, value));
      }
    });
  },
});
