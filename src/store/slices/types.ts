import { StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type HistoryEvent = {
  id: string;
  type: 'transaction' | 'job' | 'asset' | 'life' | 'consumable';
  subtype?: string;
  description: string;
  timestamp: number;
  metadata?: Record<string, any>;
};

// Player slice types
export interface PlayerSlice {
  player: {
    money: number;
    name: string;
    age: number;
    stats: {
      health: number;
      happiness: number;
      energy: number;
    };
  };
  addMoney: (amount: number, reason: string) => void;
  spendMoney: (amount: number, reason: string) => boolean;
  updateStat: (stat: string, value: number) => void;
}

// Jobs slice types
export interface JobsSlice {
  jobs: {
    currentJob: {
      title: string;
      company: string;
      salary: number;
    } | null;
    availableJobs: Array<{
      id: string;
      title: string;
      company: string;
      salary: number;
      requirements?: Record<string, number>;
    }>;
  };
  applyForJob: (jobId: string) => boolean;
  quitJob: () => void;
  collectSalary: () => void;
}

// Assets slice types
export interface AssetsSlice {
  assets: {
    owned: Array<{
      id: string;
      name: string;
      type: 'property' | 'vehicle' | 'investment';
      value: number;
      purchasePrice: number;
      purchaseDate: number;
    }>;
  };
  buyAsset: (asset: {
    name: string;
    type: 'property' | 'vehicle' | 'investment';
    price: number;
  }) => boolean;
  sellAsset: (assetId: string) => boolean;
}

// Consumables slice types
export interface ConsumablesSlice {
  consumables: {
    inventory: Array<{
      id: string;
      name: string;
      quantity: number;
      effects: Record<string, number>;
    }>;
  };
  buyConsumable: (
    consumable: { name: string; price: number; effects: Record<string, number> },
    quantity?: number
  ) => boolean;
  useConsumable: (consumableId: string) => boolean;
}

// History slice types
export interface HistorySlice {
  history: {
    events: HistoryEvent[];
  };
  addHistoryEvent: (event: Omit<HistoryEvent, 'id' | 'timestamp'>) => void;
}

// Game actions slice types
export interface GameActionsSlice {
  advanceDay: () => void;
  resetGame: () => void;
}

// Combined store type
export type GameStore = PlayerSlice &
  JobsSlice &
  AssetsSlice &
  ConsumablesSlice &
  HistorySlice &
  GameActionsSlice;

// Type for slice creators
export type GameSlice<T> = StateCreator<GameStore, [['zustand/immer', never]], [], T>;
