import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function AboutCTASection() {
  return (
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
          <Link href="/game">Probeer de Game</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-background text-background hover:bg-primary-foreground/10 hover:text-background"
        >
          <Link href="/contact">Neem Contact Op</Link>
        </Button>
      </div>
    </section>
  );
}
