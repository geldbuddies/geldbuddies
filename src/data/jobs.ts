export type JobCategory =
  | 'tech'
  | 'finance'
  | 'healthcare'
  | 'retail'
  | 'education'
  | 'hospitality'
  | 'creative';

export type JobLevel = 'entry' | 'junior' | 'medior' | 'senior';

export type JobRequirements = {
  minAge?: number;
  education?: string;
};

export type Job = {
  id: string;
  title: string;
  company: string;
  salary: number;
  category: JobCategory;
  level: JobLevel;
  description: string;
  requirements: JobRequirements;
  location: string;
};

export const jobs: Job[] = [
  // Tech Jobs
  {
    id: 'tech-1',
    title: 'Junior Software Developer',
    company: 'Tech Innovaties',
    salary: 45000,
    category: 'tech',
    level: 'junior',
    description: 'Start je carrière als software developer in een innovatief bedrijf.',
    requirements: {
      minAge: 18,
      education: 'hbo',
    },
    location: 'Utrecht',
  },
  {
    id: 'tech-2',
    title: 'Medior Full-stack Developer',
    company: 'Digital Solutions',
    salary: 65000,
    category: 'tech',
    level: 'medior',
    description: 'Ontwikkel complexe web applicaties in een modern tech stack.',
    requirements: {
      minAge: 18,
      education: 'wo',
    },
    location: 'Amsterdam',
  },
  {
    id: 'tech-3',
    title: 'Senior Software Architect',
    company: 'Enterprise Solutions',
    salary: 90000,
    category: 'tech',
    level: 'senior',
    description: 'Lead technische beslissingen en mentor junior developers.',
    requirements: {
      minAge: 18,
      education: 'master',
    },
    location: 'Rotterdam',
  },

  // Finance Jobs
  {
    id: 'finance-1',
    title: 'Junior Accountant',
    company: 'FinanceFirst',
    salary: 38000,
    category: 'finance',
    level: 'junior',
    description: 'Start je carrière in financiële administratie.',
    requirements: {
      minAge: 18,
      education: 'mbo',
    },
    location: 'Den Haag',
  },
  {
    id: 'finance-2',
    title: 'Financial Controller',
    company: 'Corporate Finance BV',
    salary: 60000,
    category: 'finance',
    level: 'medior',
    description: 'Verantwoordelijk voor financiële rapportages en analyses.',
    requirements: {
      minAge: 18,
      education: 'hbo',
    },
    location: 'Amsterdam',
  },

  // Retail Jobs
  {
    id: 'retail-1',
    title: 'Winkelmedewerker',
    company: 'SuperMarkt',
    salary: 25000,
    category: 'retail',
    level: 'entry',
    description: 'Help klanten en zorg voor een nette winkel.',
    requirements: {
      minAge: 16,
    },
    location: 'Landelijk',
  },
  {
    id: 'retail-2',
    title: 'Afdelingsmanager',
    company: 'SuperMarkt',
    salary: 35000,
    category: 'retail',
    level: 'medior',
    description: 'Leiding geven aan een team van winkelmedewerkers.',
    requirements: {
      minAge: 18,
      education: 'mbo',
    },
    location: 'Landelijk',
  },

  // Healthcare Jobs
  {
    id: 'health-1',
    title: 'Verpleegkundige',
    company: 'Stadsziekenhuis',
    salary: 42000,
    category: 'healthcare',
    level: 'medior',
    description: 'Zorg voor patiënten in een dynamische ziekenhuisomgeving.',
    requirements: {
      minAge: 18,
      education: 'hbo',
    },
    location: 'Utrecht',
  },

  // Education Jobs
  {
    id: 'edu-1',
    title: 'Docent Basisonderwijs',
    company: 'Basisschool De Toekomst',
    salary: 38000,
    category: 'education',
    level: 'junior',
    description: 'Lesgeven aan groep 5-8 van de basisschool.',
    requirements: {
      minAge: 18,
      education: 'hbo',
    },
    location: 'Rotterdam',
  },

  // Hospitality Jobs
  {
    id: 'hosp-1',
    title: 'Horecamedewerker',
    company: 'Grand Café Central',
    salary: 24000,
    category: 'hospitality',
    level: 'entry',
    description: 'Serveren van drankjes en gerechten in ons café.',
    requirements: {
      minAge: 16,
    },
    location: 'Amsterdam',
  },

  // Creative Jobs
  {
    id: 'creative-1',
    title: 'Junior Graphic Designer',
    company: 'Creative Studio',
    salary: 32000,
    category: 'creative',
    level: 'junior',
    description: 'Ontwerp visuele content voor diverse klanten.',
    requirements: {
      minAge: 18,
      education: 'mbo',
    },
    location: 'Amsterdam',
  },
];
