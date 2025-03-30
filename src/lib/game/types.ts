// Game activity types
export type ActivityCategory = 'bank' | 'onderwijs' | 'sport' | 'shopping' | 'werk';

export interface Activity {
  id: string;
  title: string;
  description: string;
  cost: number;
  category: ActivityCategory;
  effect: {
    money?: number;
    knowledge?: number;
    happiness?: number;
    health?: number;
  };
}

// Game events that can happen randomly
export interface GameEvent {
  id: string;
  title: string;
  description: string;
  effect: {
    money?: number;
    knowledge?: number;
    happiness?: number;
    health?: number;
  };
  probability: number; // 0-1, chance of happening each turn
  isYearly?: boolean; // Indicates if this event should only happen once per year
}

// Player character stats
export interface PlayerCharacter {
  name: string;
  age: number;
  money: number;
  income: number;
  knowledge: number;
  happiness: number;
  health: number;
}

// Starting scenario
export interface GameScenario {
  id: string;
  name: string;
  description: string;
  character: PlayerCharacter;
}

// Game state
export interface GameState {
  currentDate: Date;
  character: PlayerCharacter;
  selectedCategory: ActivityCategory;
  activityHistory: {
    date: Date;
    description: string;
    effect: {
      money?: number;
      knowledge?: number;
      happiness?: number;
      health?: number;
    };
  }[];
  yearlyEventsOccurred: string[]; // IDs of yearly events that have already happened this year
}
