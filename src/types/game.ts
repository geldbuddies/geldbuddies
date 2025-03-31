export interface Job {
  id: string;
  title: string;
  income: number;
}

export interface Asset {
  id: string;
  name: string;
  category: 'housing' | 'transport' | 'investment' | 'other';
  value: number;
  monthlyCost: number; // Monthly cost of owning/maintaining the asset
}

export interface Consumable {
  id: string;
  name: string;
  category: 'food' | 'utility' | 'subscription' | 'healthcare' | 'other';
  monthlyCost: number;
}

export interface GameState {
  // Player information
  birthMonth: number;
  birthYear: number;

  // Player finances
  money: number;
  jobs: Job[];
  assets: Asset[];
  consumables: Consumable[];

  // Time
  month: number;
  year: number;

  // Game state
  events: Array<{ id: string; seen: boolean }>;
}
