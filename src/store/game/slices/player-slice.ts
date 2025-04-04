import { GameSlice, PlayerSlice } from '../types';

export const createPlayerSlice: GameSlice<PlayerSlice> = (set, get) => ({
  player: {
    money: 0,
    name: '',
    birthMonth: 1,
    birthYear: 2000,
    isInitialized: false,
  },

  initializePlayer: (playerData) => {
    set((state) => {
      state.player = {
        money: playerData.money,
        name: playerData.name,
        birthMonth: playerData.birthMonth,
        birthYear: playerData.birthYear,
        isInitialized: true,
      };
    });
  },

  addMoney: (amount, reason) => {
    console.log('addMoney', amount, reason);

    set((state) => {
      state.player.money += amount;
    });
  },

  spendMoney: (amount, reason) => {
    if (get().player.money >= amount) {
      set((state) => {
        state.player.money -= amount;
      });

      return true;
    }
    return false;
  },
});
