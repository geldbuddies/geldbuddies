import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Over GeldBuddies</h1>

      {/* Mission Section */}
      <section className="mb-16">
        <div className="bg-primary/5 dark:bg-primary/10 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-primary dark:text-primary">Onze Missie</h2>
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
          <Card className="p-0">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4 text-xl font-bold text-primary dark:text-primary">
                1
              </div>
              <CardTitle className="text-xl mb-2">Educatief</CardTitle>
              <CardDescription className="text-base">
                We combineren financiële theorie met praktische toepassingen, zodat jongeren niet
                alleen weten wat ze moeten doen, maar ook waarom.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="p-0">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4 text-xl font-bold text-primary dark:text-primary">
                2
              </div>
              <CardTitle className="text-xl mb-2">Interactief</CardTitle>
              <CardDescription className="text-base">
                Door actieve participatie en directe feedback leren gebruikers sneller en onthouden
                ze de lesstof beter.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="p-0">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4 text-xl font-bold text-primary dark:text-primary">
                3
              </div>
              <CardTitle className="text-xl mb-2">Motiverend</CardTitle>
              <CardDescription className="text-base">
                Met achievements, levels en uitdagingen houden we gebruikers gemotiveerd om te
                blijven leren en groeien.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Voor Wie is GeldBuddies?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-0">
            <CardContent className="p-6">
              <CardTitle className="text-xl mb-2">Scholieren (16-18 jaar)</CardTitle>
              <CardDescription className="text-base">
                Focus op basiskennis over budgetteren, sparen en eerste financiële
                verantwoordelijkheden.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="p-0">
            <CardContent className="p-6">
              <CardTitle className="text-xl mb-2">Studenten (18-25 jaar)</CardTitle>
              <CardDescription className="text-base">
                Aandacht voor studiefinanciering, op kamers wonen, en het voorkomen van
                studieschulden.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="p-0">
            <CardContent className="p-6">
              <CardTitle className="text-xl mb-2">Docenten</CardTitle>
              <CardDescription className="text-base">
                Tools om financiële educatie in de klas te integreren en de voortgang van leerlingen
                te monitoren.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Ons Team</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Team member placeholders - replace with actual team members */}
          {[1, 2, 3, 4].map((member) => (
            <Card key={member} className="p-0 text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-muted dark:bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-muted-foreground dark:text-muted-foreground text-xl">
                    Foto
                  </span>
                </div>
                <CardTitle className="text-xl mb-1">Teamlid {member}</CardTitle>
                <p className="text-muted-foreground dark:text-muted-foreground mb-3">Functie</p>
                <CardDescription className="text-sm">
                  Korte beschrijving van de rol en expertise van het teamlid binnen het GeldBuddies
                  project.
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Doe Mee!</h2>
        <p className="text-xl mb-6">
          Help ons om financiële educatie toegankelijker te maken voor jongeren.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-background text-primary hover:bg-background/90"
          >
            <a
              href="/game"
              className="bg-background text-primary hover:bg-background/90 font-bold py-3 px-6 rounded-md inline-block"
            >
              Probeer de Game
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-background text-background hover:bg-primary-foreground/10 hover:text-background"
          >
            <a
              href="/contact"
              className="bg-transparent border-2 border-background text-background hover:bg-primary-foreground/10 font-bold py-3 px-6 rounded-md inline-block"
            >
              Neem Contact Op
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
