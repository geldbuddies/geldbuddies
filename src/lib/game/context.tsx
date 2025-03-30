'use client';

import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { activities, financialTips, gameEvents, startingScenarios } from './data';
import { ActivityCategory, GameState, PlayerCharacter } from './types';

// Initial game state
const initialState: GameState = {
  currentDate: new Date(2025, 0, 1), // January 1, 2025
  character: startingScenarios[0].character,
  selectedCategory: 'onderwijs',
  activityHistory: [],
  yearlyEventsOccurred: [], // Track yearly events that have already occurred this year
};

// Action types
type GameAction =
  | { type: 'SELECT_CATEGORY'; payload: ActivityCategory }
  | { type: 'SELECT_CHARACTER'; payload: PlayerCharacter }
  | { type: 'PERFORM_ACTIVITY'; payload: { activityId: string; category: ActivityCategory } }
  | { type: 'NEXT_MONTH' }
  | { type: 'RESET_GAME'; payload?: { character?: PlayerCharacter } };

// Reducer function
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SELECT_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload,
      };

    case 'SELECT_CHARACTER':
      return {
        ...state,
        character: action.payload,
      };

    case 'PERFORM_ACTIVITY': {
      const { activityId, category } = action.payload;
      const activity = activities[category].find((a) => a.id === activityId);

      if (!activity) return state;

      // Update character stats based on activity
      const newCharacter = { ...state.character };
      if (activity.effect.money !== undefined) {
        newCharacter.money += activity.effect.money;
      }
      if (activity.effect.knowledge !== undefined) {
        newCharacter.knowledge += activity.effect.knowledge;
      }
      if (activity.effect.happiness !== undefined) {
        newCharacter.happiness += activity.effect.happiness;
      }
      if (activity.effect.health !== undefined) {
        newCharacter.health += activity.effect.health;
      }

      // Add to activity history
      const newHistory = [
        {
          date: new Date(state.currentDate),
          description: `Je hebt "${activity.title}" gedaan`,
          effect: activity.effect,
        },
        ...state.activityHistory,
      ];

      return {
        ...state,
        character: newCharacter,
        activityHistory: newHistory,
      };
    }

    case 'NEXT_MONTH': {
      // Add one month to current date
      const newDate = new Date(state.currentDate);
      const oldYear = newDate.getFullYear();
      newDate.setMonth(newDate.getMonth() + 1);
      const newYear = newDate.getFullYear();

      // Check if we've moved to a new year
      const yearChanged = newYear > oldYear;

      // Reset yearly events if we've moved to a new year
      let yearlyEventsOccurred = state.yearlyEventsOccurred;
      if (yearChanged) {
        yearlyEventsOccurred = [];
      }

      // Update character money with monthly income
      const newCharacter = { ...state.character };
      newCharacter.money += newCharacter.income; // Full monthly income

      // Check for random events - increased probability since we're advancing a month
      // We'll check for multiple events since a month is a longer period
      let newHistory = [...state.activityHistory];

      // Try for 2-3 random events per month
      const numberOfEvents = Math.floor(Math.random() * 2) + 1;

      for (let i = 0; i < numberOfEvents; i++) {
        // Get eligible events (non-yearly or yearly that haven't occurred yet this year)
        const eligibleEvents = gameEvents.filter(
          (event) => !event.isYearly || !yearlyEventsOccurred.includes(event.id)
        );

        // Higher probability for each event since we're simulating a whole month
        const randomEvent = eligibleEvents.find((event) => Math.random() < event.probability * 4);

        if (randomEvent) {
          // If it's a yearly event, mark it as occurred
          if (randomEvent.isYearly) {
            yearlyEventsOccurred.push(randomEvent.id);
          }

          // Apply event effects
          if (randomEvent.effect.money !== undefined) {
            newCharacter.money += randomEvent.effect.money;
          }
          if (randomEvent.effect.knowledge !== undefined) {
            newCharacter.knowledge += randomEvent.effect.knowledge;
          }
          if (randomEvent.effect.happiness !== undefined) {
            newCharacter.happiness += randomEvent.effect.happiness;
          }
          if (randomEvent.effect.health !== undefined) {
            newCharacter.health += randomEvent.effect.health;
          }

          // Add event to history
          newHistory = [
            {
              date: newDate,
              description: `${randomEvent.title}: ${randomEvent.description}`,
              effect: randomEvent.effect,
            },
            ...newHistory,
          ];
        }
      }

      return {
        ...state,
        currentDate: newDate,
        character: newCharacter,
        activityHistory: newHistory,
        yearlyEventsOccurred,
      };
    }

    case 'RESET_GAME':
      return {
        ...initialState,
        character: action.payload?.character || initialState.character,
        currentDate: new Date(2025, 0, 1),
        activityHistory: [],
        yearlyEventsOccurred: [],
      };

    default:
      return state;
  }
}

// Context
type GameContextType = {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  getActivitiesForCategory: (category: ActivityCategory) => (typeof activities)[ActivityCategory];
  getRandomTip: () => string;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider component
export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const getActivitiesForCategory = (category: ActivityCategory) => {
    return activities[category];
  };

  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * financialTips.length);
    return financialTips[randomIndex];
  };

  return (
    <GameContext.Provider value={{ state, dispatch, getActivitiesForCategory, getRandomTip }}>
      {children}
    </GameContext.Provider>
  );
}

// Custom hook to use the game context
export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
