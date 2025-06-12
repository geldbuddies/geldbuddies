import { GameSlice, PlayerSlice } from '../types';

export const createPlayerSlice: GameSlice<PlayerSlice> = (set, get) => ({
  player: {
    money: 0,
    name: '',
    birthMonth: 1,
    birthYear: 2000,
    isInitialized: false,
    energy: 100,
    maxEnergy: 100,
  },

  initializePlayer: (playerData) => {
    set((state) => {
      state.player = {
        money: playerData.money,
        name: playerData.name,
        birthMonth: playerData.birthMonth,
        birthYear: playerData.birthYear,
        isInitialized: true,
        energy: 100,
        maxEnergy: 100,
      };
    });
  },

  addMoney: (amount) => {
    set((state) => {
      state.player.money += amount;
    });
  },

  spendMoney: (amount) => {
    if (get().player.money >= amount) {
      set((state) => {
        state.player.money -= amount;
      });

      return true;
    }
    return false;
  },

  useEnergy: (amount) => {
    if (get().player.energy >= amount) {
      set((state) => {
        state.player.energy -= amount;
      });
      return true;
    }
    return false;
  },

  resetEnergy: () => {
    set((state) => {
      state.player.energy = state.player.maxEnergy;
    });
  },
});
