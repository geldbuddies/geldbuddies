import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-none">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-3xl font-bold mb-4">Klaar om te beginnen?</h2>
                <p className="text-lg max-w-xl">
                  Start vandaag nog met GeldBuddies en maak de eerste stap naar financiële
                  zelfredzaamheid.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="outline" size="lg">
                  <Link href="/game">Start de Game</Link>
                </Button>
                <Button asChild variant="default" size="lg">
                  <Link href="/contact">Neem Contact Op</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
