import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Leer slim omgaan met geld op een leuke manier
            </h1>
            <p className="text-xl mb-8">
              GeldBuddies helpt jongeren financieel zelfredzaam te worden door middel van een
              interactieve game.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-background text-primary hover:bg-background/90"
              >
                <Link href="/game">Start de Game</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-background text-background hover:bg-primary-foreground/10 hover:text-background"
              >
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
  );
}
