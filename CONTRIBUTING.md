# Bijdragen aan GeldBuddies

Bedankt voor je interesse om bij te dragen aan GeldBuddies! Dit document biedt richtlijnen en instructies voor het bijdragen aan het project.

## Getting Started

1. Clone de repository
2. Installeer dependencies met PNPM
3. Maak een nieuwe branch voor je feature/fix
4. Maak je wijzigingen
5. Dien een pull request in

## Development Setup

```bash
# Clone de repository
git clone https://github.com/geldbuddies/geldbuddies.git

# Navigeer naar de projectdirectory
cd geldbuddies

# Installeer dependencies
pnpm install

# Start de development server
pnpm dev
```

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

## Branch Management

**BELANGRIJK: Directe commits en pushes naar de main branch zijn niet toegestaan.** Alle wijzigingen moeten via pull requests worden doorgevoerd.

### Branch Naming Convention

We volgen semantische branch-naamgeving om onze repository georganiseerd te houden:

- `feat/`: Voor nieuwe features (bijv. `feat/user-authentication`)
- `fix/`: Voor bugfixes (bijv. `fix/login-validation`)
- `docs/`: Voor documentatiewijzigingen (bijv. `docs/api-endpoints`)
- `refactor/`: Voor code refactoring (bijv. `refactor/component-structure`)
- `test/`: Voor het toevoegen of wijzigen van tests (bijv. `test/user-service`)

### Workflow voor nieuwe wijzigingen

Volg deze stappen voor het maken van wijzigingen:

```bash
# Controleer op welke branch je momenteel zit
git branch

# Ga naar de main branch
git checkout main

# Zorg ervoor dat je main branch up-to-date is
git pull

# Maak een nieuwe branch voor je wijzigingen
git checkout -b feat/jouw-feature-naam

# Verifieer dat je nieuwe branch succesvol is aangemaakt
git branch
```

## Commit Message Convention

We volgen de Semantic Commits-specificatie voor commit-berichten:

```
<type>(<optionele scope>): <description>

[optionele body]

[optionele footer]
```

Types:

- `feat`: Een nieuwe feature
- `fix`: Een bugfix
- `docs`: Documentatiewijzigingen
- `style`: Codesstijlwijzigingen (formattering, ontbrekende puntkomma's, etc.)
- `refactor`: Code refactoring
- `perf`: Performance verbeteringen
- `test`: Toevoegen of wijzigen van tests
- `chore`: Wijzigingen aan buildproces of hulpmiddelen

Voorbeelden:

```
feat(auth): add user login functionality
fix(validation): correct email validation regex
docs: update API documentation
```

## Pull Request-proces

1. Update je lokale repository om de laatste wijzigingen van main op te nemen
2. Zorg ervoor dat je wijzigingen alle tests en lint-checks doorstaan
3. Maak een pull request met een duidelijke titel en beschrijving
4. Link gerelateerde issues in de pull request-beschrijving
5. Wacht op review en verwerk eventuele feedback

## Wijzigingen aanbrengen

Voor alle wijzigingen, ongeacht de grootte:

- Maak een nieuwe branch volgens de branch-naamgevingsconventie
- Maak je wijzigingen in logische commits
- Schrijf duidelijke commit-berichten volgens de conventie
- Update documentatie indien nodig
- Voeg tests toe of update deze indien nodig
- Dien een pull request in voor review

## Codestijl

- Volg de bestaande codestijl in het project
- Gebruik TypeScript voor alle nieuwe code
- Schrijf zelf-documenterende code met duidelijke variabele- en functienamen
- Voeg commentaar toe voor complexe logica
- Gebruik ESLint om codekwaliteit te waarborgen
- Bestanden, componenten en mappen gebruiken kebab-case (bijv. `navigation-bar.tsx`, `user-profile.tsx`)

### Standaard Component Template

Voor React componenten gebruiken we de volgende standaard export structuur:

```tsx
export default function NavigationBar() {
  return <div>{/* Component content */}</div>;
}
```

### Componenten met Props

Wanneer een component props heeft, definiëren we deze met TypeScript interfaces:

```tsx
// Definieer de props interface
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  disabled?: boolean;
}

// Component met props
export default function Button({
  label,
  variant = 'primary',
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
```

Deze export pattern maakt componenten consistent en gemakkelijk herkenbaar.

De interface voor props maakt duidelijk welke properties het component verwacht, welke verplicht zijn en welke optioneel (gemarkeerd met `?`). Ook kunnen we default values instellen voor optionele props.
