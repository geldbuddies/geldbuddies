# GeldBuddies test

GeldBuddies is een educatief spelplatform ontworpen om financiële geletterdheid op een boeiende en interactieve manier aan studenten te leren.

## Projectoverzicht

De applicatie bestaat uit twee hoofdonderdelen:

- Een website met informatie en bronnen over financiële geletterdheid
- Een interactief spelgedeelte waar studenten kunnen leren door te spelen

## Vereisten

Voordat je begint, zorg ervoor dat je het volgende hebt geïnstalleerd:

- Node.js (versie 18 of hoger)
- PNPM (we gebruiken dit als onze package manager)

## Getting Started

1. Clone de repository:

```bash
git clone https://github.com/yourusername/geldbuddies.git
cd geldbuddies
```

2. Installeer dependencies:

```bash
pnpm install
```

3. Start de development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in je browser om het resultaat te zien.

## Projectstructuur

```
src/
├── app/
│   ├── (website)/         # Hoofdwebsite pagina's
│   │   └── layout.tsx     # Layout voor normale pagina's
│   ├── game/              # Spelgerelateerde pagina's
│   │   └── layout.tsx     # Layout voor game pagina's
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Globale styling
├── components/            # Herbruikbare React-componenten
│   └── navigation/        # Navigatiegerelateerde componenten
```

## Technologiestack

- **Framework**: Next.js 15.2
- **Taal**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: PNPM
- **Linting**: ESLint
- **Development Server**: Turbopack

## Bijdragen

We verwelkomen bijdragen! Raadpleeg onze [Richtlijnen voor bijdragen](CONTRIBUTING.md) voor details over hoe je kunt beginnen.

## Development Workflow

**BELANGRIJK: Directe commits en pushes naar de main branch zijn niet toegestaan.** Alle wijzigingen moeten via pull requests worden doorgevoerd.

Volg deze stappen voor het maken van wijzigingen:

1. Controleer op welke branch je momenteel zit:

```bash
git branch
```

2. Zorg ervoor dat je op de hoofdbranch bent en up-to-date:

```bash
git checkout main
git pull origin main
```

3. Maak een nieuwe branch voor je feature/fix:

```bash
git checkout -b feat/jouw-feature-naam
```

4. Verifieer dat je nieuwe branch succesvol is aangemaakt:

```bash
git branch
```

5. Maak je wijzigingen en commit met semantische commit-berichten:

```bash
git commit -m "feat(scope): beschrijving van wijzigingen"
```

6. Push je wijzigingen en maak een pull request:

```bash
git push origin feat/jouw-feature-naam
```

## Commit Message Format

We volgen de Semantic Commits-specificatie voor commit-berichten:

```
<type>(<optionele scope>): <description>
```

Types:

- `feat`: Een nieuwe feature
- `fix`: Een bugfix
- `docs`: Documentatiewijzigingen
- `style`: Codesstijlwijzigingen
- `refactor`: Code refactoring
- `perf`: Performance verbeteringen
- `test`: Toevoegen of wijzigen van tests
- `chore`: Wijzigingen aan buildproces of hulpmiddelen

## Beschikbare scripts

- `pnpm dev` - Start ontwikkelingsserver met Turbopack
- `pnpm build` - Maak productie-build
- `pnpm start` - Draai productieserver
- `pnpm lint` - Voer ESLint uit voor codekwaliteit

## Meer informatie

Om meer te leren over de technologieën die we gebruiken:

- [Next.js Documentatie](https://nextjs.org/docs) - Meer over Next.js functies
- [TypeScript Documentatie](https://www.typescriptlang.org/docs/) - Meer over TypeScript
- [Tailwind CSS Documentatie](https://tailwindcss.com/docs) - Meer over Tailwind CSS
