const PROBLEMS = [
  'Een hoog percentage jongeren heeft te maken met financiële problemen',
  'Er is een gebrek aan aansprekend financieel lesmateriaal',
  'Jongeren zijn zich onvoldoende bewust van financiële valkuilen',
  'De huidige aanpak voor financiële educatie sluit niet aan bij de belevingswereld van jongeren',
  'Bestaande oplossingen sluiten niet volledig aan bij de behoeften',
];

const SOLUTIONS = [
  'Een interactieve game die financiële concepten op een leuke manier uitlegt',
  "Realistische scenario's die aansluiten bij de leefwereld van jongeren",
  'Gamification-elementen die motiveren om te blijven leren',
  'Persoonlijke feedback en voortgangsmonitoring',
  'Een platform dat zowel individueel als in klasverband gebruikt kan worden',
];

export function ProblemSolutionSection() {
  return (
    <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Het Probleem</h2>
        <ul className="space-y-3 list-disc pl-5">
          {PROBLEMS.map((problem, index) => (
            <li key={index}>{problem}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Onze Oplossing</h2>
        <ul className="space-y-3 list-disc pl-5">
          {SOLUTIONS.map((solution, index) => (
            <li key={index}>{solution}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
