import { calculateTotalExpenses, calculateTotalIncome } from '@/features/finance';
import { nextMonth } from '@/features/time';
import { Asset, Consumable, GameState, Job } from '@/types/game';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameActions {
  // Basic setters for each state property
  setMoney: (value: number) => void;
  reduceMoney: (value: number) => void;
  increaseMoney: (value: number) => void;
  setBirthDate: (month: number, year: number) => void;
  addJob: (job: Job) => void;
  removeJob: (id: string) => void;
  addAsset: (asset: Asset) => void;
  removeAsset: (id: string) => void;
  addConsumable: (consumable: Consumable) => void;
  removeConsumable: (id: string) => void;
  advanceMonth: () => void;
  resetGame: () => void;
}

const initialState: GameState = {
  // Player is 25 years old at the start
  birthMonth: 6,
  birthYear: 1998,

  money: 1000,
  jobs: [{ id: '1', title: 'Entry Level Job', income: 1500 }],
  assets: [
    { id: '1', name: 'Studio Apartment', category: 'housing', value: 50000, monthlyCost: 500 },
  ],
  consumables: [{ id: '1', name: 'Basic Groceries', category: 'food', monthlyCost: 300 }],
  month: 1,
  year: 2023,
  events: [],
};

export const useGameStore = create<GameState & GameActions>()(
  persist(
    (set) => ({
      ...initialState,

      setMoney: (value) => set({ money: value }),

      reduceMoney: (value) => set((state) => ({ money: state.money - value })),

      increaseMoney: (value) => set((state) => ({ money: state.money + value })),

      setBirthDate: (month, year) => set({ birthMonth: month, birthYear: year }),

      addJob: (job) =>
        set((state) => ({
          jobs: [...state.jobs, job],
        })),

      removeJob: (id) =>
        set((state) => ({
          jobs: state.jobs.filter((job) => job.id !== id),
        })),

      addAsset: (asset) =>
        set((state) => ({
          assets: [...state.assets, asset],
        })),

      removeAsset: (id) =>
        set((state) => ({
          assets: state.assets.filter((asset) => asset.id !== id),
        })),

      addConsumable: (consumable) =>
        set((state) => ({
          consumables: [...state.consumables, consumable],
        })),

      removeConsumable: (id) =>
        set((state) => ({
          consumables: state.consumables.filter((consumable) => consumable.id !== id),
        })),

      advanceMonth: () =>
        set((state) => {
          const { month, year } = nextMonth(state.month, state.year);

          const income = calculateTotalIncome(state.jobs);

          const expenses = calculateTotalExpenses(state.assets, state.consumables);

          return {
            month,
            year,
            money: state.money + income - expenses,
          };
        }),

      resetGame: () => set(initialState),
    }),
    {
      name: 'geldbuddies-game-storage',
    }
  )
);
