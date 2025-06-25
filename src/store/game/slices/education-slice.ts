import { calculateAge } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';
import { Education, EducationSlice, GameSlice } from '../types';

// Available educations
export const availableEducations: Education[] = [
  {
    id: 'mbo',
    name: 'MBO Opleiding',
    description: 'Een praktijkgerichte MBO opleiding',
    duration: 24, // 2 jaar
    cost: 2000,
    energyCost: 20,
    requirements: {
      minAge: 16,
    },
  },
  {
    id: 'hbo',
    name: 'HBO Bachelor',
    description: 'Een HBO bachelor opleiding',
    duration: 48, // 4 jaar
    cost: 8000,
    energyCost: 30,
    requirements: {
      minAge: 17,
    },
  },
  {
    id: 'wo',
    name: 'WO Bachelor',
    description: 'Een universitaire bachelor opleiding',
    duration: 36, // 3 jaar
    cost: 12000,
    energyCost: 40,
    requirements: {
      minAge: 18,
    },
  },
  {
    id: 'master',
    name: 'WO Master',
    description: 'Een universitaire master opleiding',
    duration: 24, // 2 jaar
    cost: 15000,
    energyCost: 50,
    requirements: {
      minAge: 21,
      education: ['wo'],
    },
  },
];

export const createEducationSlice: GameSlice<EducationSlice> = (set, get) => ({
  education: {
    currentEducation: null,
    availableEducations,
  },

  startEducation: (educationId: string) => {
    const education = availableEducations.find((e) => e.id === educationId);
    if (!education) return false;

    // Check requirements
    const player = get().player;
    const playerAge = calculateAge(
      player.birthMonth,
      player.birthYear,
      get().time.month,
      get().time.year
    );

    // Check age requirement
    if (education.requirements?.minAge && playerAge < education.requirements.minAge) {
      get().addHistoryEvent({
        type: 'life',
        description: `Opleiding niet gestart: Je bent te jong voor deze opleiding (minimum leeftijd: ${education.requirements.minAge})`,
      });
      return false;
    }

    // Check education requirement
    if (
      education.requirements?.education &&
      !education.requirements.education.every((req) => player.education.includes(req))
    ) {
      get().addHistoryEvent({
        type: 'life',
        description: `Opleiding niet gestart: Je hebt niet de juiste vooropleiding`,
      });
      return false;
    }

    // Check if player has enough money
    if (!get().spendMoney(education.cost, `${education.name} inschrijving`)) {
      get().addHistoryEvent({
        type: 'life',
        description: `Opleiding niet gestart: Je hebt niet genoeg geld`,
      });
      return false;
    }

    // Start education
    set((state) => {
      state.education.currentEducation = {
        educationId: education.id,
        startDate: {
          month: get().time.month,
          year: get().time.year,
        },
        monthsCompleted: 0,
      };
    });

    // Add to history
    get().addHistoryEvent({
      type: 'life',
      description: `${education.name} gestart`,
    });

    return true;
  },

  completeEducation: () => {
    const currentEducation = get().education.currentEducation;
    if (!currentEducation) return;

    const education = availableEducations.find((e) => e.id === currentEducation.educationId);
    if (!education) return;

    // Add education to player's education list
    set((state) => {
      if (!state.player.education.includes(education.id)) {
        state.player.education.push(education.id);
      }
      state.education.currentEducation = null;
    });

    // Add to history
    get().addHistoryEvent({
      type: 'life',
      description: `${education.name} afgerond!`,
    });
  },

  progressEducation: () => {
    const currentEducation = get().education.currentEducation;
    if (!currentEducation) return;

    const education = availableEducations.find((e) => e.id === currentEducation.educationId);
    if (!education) return;

    // Check if player has enough energy
    if (!get().useEnergy(education.energyCost)) {
      return;
    }

    // Check if education will be completed after this progress
    const willComplete = currentEducation.monthsCompleted + 1 >= education.duration;

    if (willComplete) {
      // Complete the education
      set((state) => {
        if (!state.player.education.includes(education.id)) {
          state.player.education.push(education.id);
        }
        state.education.currentEducation = null;
      });

      // Add completion history event
      get().addHistoryEvent({
        type: 'life',
        description: `${education.name} afgerond!`,
      });
    } else {
      // Just progress education
      set((state) => {
        if (state.education.currentEducation) {
          state.education.currentEducation.monthsCompleted++;
        }
      });
    }
  },
});
