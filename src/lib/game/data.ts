import { Activity, ActivityCategory, GameEvent, GameScenario } from './types';

// Activities by category
export const activities: Record<ActivityCategory, Activity[]> = {
  bank: [
    {
      id: 'bank-1',
      title: 'Open een spaarrekening',
      description: 'Open een spaarrekening met een rentevergoeding van 2% per jaar.',
      cost: 0,
      category: 'bank',
      effect: {
        money: 0,
        knowledge: 5,
      },
    },
    {
      id: 'bank-2',
      title: 'Investeer in aandelen',
      description:
        'Investeer een bedrag in aandelen met een potentieel rendement van 7% per jaar, maar ook risico op verlies.',
      cost: 100,
      category: 'bank',
      effect: {
        money: -100,
        knowledge: 10,
      },
    },
    {
      id: 'bank-3',
      title: 'Vraag een lening aan',
      description: 'Leen €500 met een rente van 8% per jaar.',
      cost: 0,
      category: 'bank',
      effect: {
        money: 500,
        knowledge: 3,
        happiness: -5,
      },
    },
    {
      id: 'bank-4',
      title: 'Beleg in obligaties',
      description: 'Investeer in obligaties voor een stabiel rendement van 3% per jaar.',
      cost: 200,
      category: 'bank',
      effect: {
        money: -200,
        knowledge: 8,
      },
    },
    {
      id: 'bank-5',
      title: 'Open een beleggingsfonds',
      description: 'Start een beleggingsfonds met een divers portfolio.',
      cost: 500,
      category: 'bank',
      effect: {
        money: -500,
        knowledge: 15,
      },
    },
    {
      id: 'bank-6',
      title: 'Koop een huis',
      description: 'Investeer in onroerend goed voor lange termijn winst.',
      cost: 1000,
      category: 'bank',
      effect: {
        money: -1000,
        knowledge: 20,
        happiness: 10,
      },
    },
  ],
  onderwijs: [
    {
      id: 'onderwijs-1',
      title: 'Volg een financiële cursus',
      description: 'Leer de basisprincipes van persoonlijke financiën.',
      cost: 50,
      category: 'onderwijs',
      effect: {
        money: -50,
        knowledge: 15,
      },
    },
    {
      id: 'onderwijs-2',
      title: 'Lees een boek over beleggen',
      description: 'Vergroot je kennis over beleggen en investeringen.',
      cost: 25,
      category: 'onderwijs',
      effect: {
        money: -25,
        knowledge: 8,
      },
    },
    {
      id: 'onderwijs-3',
      title: 'Volg een workshop budgetteren',
      description: 'Leer hoe je een effectief budget opstelt en bijhoudt.',
      cost: 30,
      category: 'onderwijs',
      effect: {
        money: -30,
        knowledge: 10,
      },
    },
  ],
  sport: [
    {
      id: 'sport-1',
      title: 'Sportschool lidmaatschap',
      description: 'Word lid van de sportschool voor een maand.',
      cost: 35,
      category: 'sport',
      effect: {
        money: -35,
        health: 10,
        happiness: 5,
      },
    },
    {
      id: 'sport-2',
      title: 'Hardloopschoenen kopen',
      description: 'Investeer in goede hardloopschoenen voor buitenactiviteiten.',
      cost: 80,
      category: 'sport',
      effect: {
        money: -80,
        health: 8,
        happiness: 3,
      },
    },
    {
      id: 'sport-3',
      title: 'Voetbal club lidmaatschap',
      description: 'Word lid van een voetbalclub voor sportieve activiteiten en sociaal contact.',
      cost: 120,
      category: 'sport',
      effect: {
        money: -120,
        health: 15,
        happiness: 10,
      },
    },
  ],
  shopping: [
    {
      id: 'shopping-1',
      title: 'Nieuwe smartphone',
      description: 'Koop een nieuwe smartphone om up-to-date te blijven.',
      cost: 400,
      category: 'shopping',
      effect: {
        money: -400,
        happiness: 15,
      },
    },
    {
      id: 'shopping-2',
      title: 'Kleding kopen',
      description: 'Update je garderobe met nieuwe kleding.',
      cost: 150,
      category: 'shopping',
      effect: {
        money: -150,
        happiness: 8,
      },
    },
    {
      id: 'shopping-3',
      title: 'Boodschappen doen',
      description: 'Doe wekelijkse boodschappen voor gezonde maaltijden.',
      cost: 75,
      category: 'shopping',
      effect: {
        money: -75,
        health: 5,
      },
    },
  ],
  werk: [
    {
      id: 'werk-1',
      title: 'Parttime bijbaan',
      description: 'Werk 10 uur per week in een supermarkt.',
      cost: 0,
      category: 'werk',
      effect: {
        money: 100,
        happiness: -5,
      },
    },
    {
      id: 'werk-2',
      title: 'Freelance werk',
      description: 'Doe freelance opdrachten in je vrije tijd.',
      cost: 0,
      category: 'werk',
      effect: {
        money: 150,
        happiness: -8,
        knowledge: 5,
      },
    },
    {
      id: 'werk-3',
      title: 'Online cursus geven',
      description: 'Deel je kennis door online cursussen te geven.',
      cost: 0,
      category: 'werk',
      effect: {
        money: 200,
        knowledge: 8,
        happiness: -10,
      },
    },
  ],
};

// Random events that can occur during the game
export const gameEvents: GameEvent[] = [
  {
    id: 'event-1',
    title: 'Telefoon kapot',
    description: 'Je telefoon is kapot gegaan en moet gerepareerd worden.',
    effect: {
      money: -150,
      happiness: -5,
    },
    probability: 0.05,
  },
  {
    id: 'event-2',
    title: 'Verjaardag geld',
    description: 'Je hebt geld gekregen voor je verjaardag!',
    effect: {
      money: 50,
      happiness: 5,
    },
    probability: 0.08,
    isYearly: true,
  },
  {
    id: 'event-3',
    title: 'Ziek geworden',
    description: 'Je bent ziek geworden en moet medicijnen kopen.',
    effect: {
      money: -30,
      health: -10,
      happiness: -5,
    },
    probability: 0.1,
  },
  {
    id: 'event-4',
    title: 'Belastingteruggave',
    description: 'Je hebt onverwacht belastinggeld teruggekregen!',
    effect: {
      money: 200,
      happiness: 10,
    },
    probability: 0.03,
  },
  {
    id: 'event-5',
    title: 'Fiets gestolen',
    description: 'Je fiets is gestolen en je moet een nieuwe kopen.',
    effect: {
      money: -250,
      happiness: -8,
    },
    probability: 0.05,
  },
];

// Starting scenarios for the game
export const startingScenarios: GameScenario[] = [
  {
    id: 'scenario-1',
    name: 'Student',
    description: 'Je bent een student met een beperkt budget maar veel potentieel om te leren.',
    character: {
      name: 'Student',
      age: 18,
      money: 500,
      income: 300,
      knowledge: 10,
      happiness: 70,
      health: 80,
    },
  },
  {
    id: 'scenario-2',
    name: 'Starter',
    description: 'Je hebt net je eerste baan en moet leren omgaan met een regelmatig inkomen.',
    character: {
      name: 'Starter',
      age: 23,
      money: 1200,
      income: 1800,
      knowledge: 20,
      happiness: 75,
      health: 75,
    },
  },
  {
    id: 'scenario-3',
    name: 'Schuldenaar',
    description: 'Je zit in de schulden en moet leren hoe je hier uit kunt komen.',
    character: {
      name: 'Schuldenaar',
      age: 25,
      money: -1500,
      income: 1600,
      knowledge: 5,
      happiness: 40,
      health: 60,
    },
  },
];

// Financial tips to show in the game
export const financialTips: string[] = [
  'Maak een budget en houd je er aan. Dit helpt je om controle te houden over je uitgaven.',
  'Spaar minimaal 10% van je inkomen voor onverwachte uitgaven.',
  'Vergelijk prijzen voordat je grote aankopen doet.',
  'Vermijd impulsaankopen door 24 uur te wachten voordat je iets koopt dat je niet echt nodig hebt.',
  'Let op verborgen kosten bij abonnementen en lidmaatschappen.',
  'Betaal creditcardschulden zo snel mogelijk af om hoge rente te vermijden.',
  'Begin vroeg met sparen voor je pensioen, zelfs met kleine bedragen.',
  'Houd een buffer aan van minimaal drie maandsalarissen voor noodgevallen.',
  'Vermijd leningen voor consumptieve uitgaven.',
  'Investeer in jezelf door opleidingen te volgen die je carrièremogelijkheden verbeteren.',
];
