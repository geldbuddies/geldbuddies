export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Over GeldBuddies</h1>

      {/* Mission Section */}
      <section className="mb-16">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">Onze Missie</h2>
          <p className="text-lg mb-4">
            GeldBuddies is ontstaan vanuit een duidelijke missie: jongeren helpen financieel
            zelfredzaam te worden in een wereld waarin financiële uitdagingen steeds complexer
            worden.
          </p>
          <p className="text-lg mb-4">
            Uit onderzoek blijkt dat één op de vijf jongeren kampt met financiële problemen. Als
            ICT-studenten zien wij de kans om technologie in te zetten voor het aanpakken van dit
            maatschappelijke vraagstuk.
          </p>
          <p className="text-lg">
            Door middel van een interactieve, gamified leeromgeving willen we jongeren de kennis en
            vaardigheden bijbrengen die ze nodig hebben om verstandige financiële beslissingen te
            nemen.
          </p>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Het Probleem</h2>
          <ul className="space-y-3 list-disc pl-5">
            <li>Een hoog percentage jongeren heeft te maken met financiële problemen</li>
            <li>Er is een gebrek aan aansprekend financieel lesmateriaal</li>
            <li>Jongeren zijn zich onvoldoende bewust van financiële valkuilen</li>
            <li>
              De huidige aanpak voor financiële educatie sluit niet aan bij de belevingswereld van
              jongeren
            </li>
            <li>Bestaande oplossingen sluiten niet volledig aan bij de behoeften</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Onze Oplossing</h2>
          <ul className="space-y-3 list-disc pl-5">
            <li>Een interactieve game die financiële concepten op een leuke manier uitlegt</li>
            <li>Realistische scenario's die aansluiten bij de leefwereld van jongeren</li>
            <li>Gamification-elementen die motiveren om te blijven leren</li>
            <li>Persoonlijke feedback en voortgangsmonitoring</li>
            <li>Een platform dat zowel individueel als in klasverband gebruikt kan worden</li>
          </ul>
        </div>
      </section>

      {/* Approach Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Onze Aanpak</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 text-xl font-bold text-blue-600 dark:text-blue-400">
              1
            </div>
            <h3 className="text-xl font-bold mb-2">Educatief</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We combineren financiële theorie met praktische toepassingen, zodat jongeren niet
              alleen weten wat ze moeten doen, maar ook waarom.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 text-xl font-bold text-blue-600 dark:text-blue-400">
              2
            </div>
            <h3 className="text-xl font-bold mb-2">Interactief</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Door actieve participatie en directe feedback leren gebruikers sneller en onthouden ze
              de lesstof beter.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 text-xl font-bold text-blue-600 dark:text-blue-400">
              3
            </div>
            <h3 className="text-xl font-bold mb-2">Motiverend</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Met achievements, levels en uitdagingen houden we gebruikers gemotiveerd om te blijven
              leren en groeien.
            </p>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Voor Wie is GeldBuddies?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Scholieren (16-18 jaar)</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Focus op basiskennis over budgetteren, sparen en eerste financiële
              verantwoordelijkheden.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Studenten (18-25 jaar)</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Aandacht voor studiefinanciering, op kamers wonen, en het voorkomen van
              studieschulden.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Docenten</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tools om financiële educatie in de klas te integreren en de voortgang van leerlingen
              te monitoren.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Ons Team</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Team member placeholders - replace with actual team members */}
          {[1, 2, 3, 4].map((member) => (
            <div
              key={member}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
            >
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-400 dark:text-gray-500 text-xl">Foto</span>
              </div>
              <h3 className="text-xl font-bold mb-1">Teamlid {member}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">Functie</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Korte beschrijving van de rol en expertise van het teamlid binnen het GeldBuddies
                project.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Doe Mee!</h2>
        <p className="text-xl mb-6">
          Help ons om financiële educatie toegankelijker te maken voor jongeren.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/game"
            className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-md inline-block"
          >
            Probeer de Game
          </a>
          <a
            href="/contact"
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-6 rounded-md inline-block"
          >
            Neem Contact Op
          </a>
        </div>
      </section>
    </div>
  );
}
