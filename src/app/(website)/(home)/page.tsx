import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl text-primary-foreground md:text-5xl font-bold mb-6">
                Leer slim omgaan met geld op een leuke manier
              </h1>
              <p className="text-xl text-primary-foreground/80 mb-8">
                GeldBuddies helpt jongeren financieel zelfredzaam te worden door middel van een
                interactieve game.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="outline" size="lg">
                  <Link href="/game">Start de Game</Link>
                </Button>
                <Button asChild variant="default" size="lg" className="border border-input">
                  <Link href="/about">Meer Informatie</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-full max-w-md h-80 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                {/* Placeholder for an illustration or screenshot */}
                <p className="text-lg font-medium">Game Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Waarom GeldBuddies?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-0">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary dark:text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-xl mb-2">Leer door te spelen</CardTitle>
                <CardDescription className="text-base">
                  Door middel van gamification maken we financiële educatie leuk en toegankelijk
                  voor jongeren.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="p-0">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary dark:text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <CardTitle className="text-xl mb-2">Realistische scenario's</CardTitle>
                <CardDescription className="text-base">
                  Ervaar levensechte financiële situaties en leer hoe je verstandige beslissingen
                  kunt nemen.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="p-0">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary dark:text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <CardTitle className="text-xl mb-2">Volg je voortgang</CardTitle>
                <CardDescription className="text-base">
                  Houd je financiële groei bij en verdien achievements terwijl je leert over
                  geldzaken.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted dark:bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Wat zeggen onze gebruikers?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-0">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary dark:text-primary font-bold">K</span>
                  </div>
                  <div>
                    <CardTitle className="text-base">Kim</CardTitle>
                    <CardDescription className="text-sm">HAVO 4 leerling</CardDescription>
                  </div>
                </div>
                <p className="text-muted-foreground dark:text-muted-foreground">
                  "Dankzij GeldBuddies heb ik geleerd hoe ik kan sparen voor mijn nieuwe laptop. De
                  game maakt het echt leuk om over geld te leren!"
                </p>
              </CardContent>
            </Card>

            <Card className="p-0">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary dark:text-primary font-bold">T</span>
                  </div>
                  <div>
                    <CardTitle className="text-base">Thomas</CardTitle>
                    <CardDescription className="text-sm">HBO-student</CardDescription>
                  </div>
                </div>
                <p className="text-muted-foreground dark:text-muted-foreground">
                  "De simulaties in GeldBuddies hebben me geholpen om beter met mijn
                  studiefinanciering om te gaan. Ik kom nu elke maand rond zonder stress."
                </p>
              </CardContent>
            </Card>

            <Card className="p-0">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary dark:text-primary font-bold">B</span>
                  </div>
                  <div>
                    <CardTitle className="text-base">Bart</CardTitle>
                    <CardDescription className="text-sm">Economiedocent</CardDescription>
                  </div>
                </div>
                <p className="text-muted-foreground dark:text-muted-foreground">
                  "Als docent vind ik GeldBuddies een geweldige aanvulling op mijn lessen. Mijn
                  leerlingen zijn veel meer betrokken bij het onderwerp financiën."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Klaar om te beginnen?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start vandaag nog met GeldBuddies en leer op een leuke manier omgaan met geld.
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-background text-primary hover:bg-background/90"
          >
            <Link href="/game">Start de Game</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
