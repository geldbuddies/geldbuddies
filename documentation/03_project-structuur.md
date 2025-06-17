# 🧱 Projectstructuur

geldbuddies/
├── src/                         # Broncode
│   ├── app/                     # Next.js App Router structuur
│   │   ├── (website)/           # Publieke website (landingspagina e.d.)
│   │   ├── api/                 # API-routes (tRPC / Next.js handlers)
│   │   ├── classroom/           # Functionaliteit voor klaslokalen
│   │   ├── dashboard/           # Dashboardweergaven voor docenten
│   │   ├── game/                # Simulatie- en spelomgeving
│   │   ├── teacher/             # Interface specifiek voor docenten
│   │   └── ...                  # Overige routes
│
│   ├── components/              # Herbruikbare React-componenten
│   │   ├── classroom/           # UI-componenten voor klaslokalen
│   │   ├── game/                # Componenten voor het simulatiespel
│   │   ├── navigation/          # Navigatiecomponenten (navbar, sidebar)
│   │   ├── forms/               # Formulieren (bijv. login, klas aanmaken)
│   │   ├── sections/            # Paginasecties (bijv. header, hero-sectie)
│   │   └── ui/                  # Basiselementen zoals knoppen, inputs, modals
│
│   ├── server/                  # Backend-logica
│   │   ├── api/                 # tRPC API-routes en handlers
│   │   ├── auth/                # Authenticatielogica
│   │   └── db/                  # Databaseconfiguratie (Drizzle + schema’s)
│
│   ├── trpc/                    # Clientconfiguratie voor tRPC
│   ├── types/                   # Globale TypeScript types
│   ├── lib/                     # Hulpfuncties en utilities
│   ├── hooks/                   # Custom React hooks
│   ├── store/                   # Zustand stores voor state management
│   └── analysis/                # Tools en logica voor analyses/statistieken
│
├── Configuratiebestanden:
│   ├── package.json             # Projectafhankelijkheden en scripts
│   ├── tsconfig.json            # TypeScript-configuratie
│   ├── next.config.ts           # Next.js-configuratie
│   └── ...                      # Overige configs (ESLint, PostCSS, Drizzle, etc.)

