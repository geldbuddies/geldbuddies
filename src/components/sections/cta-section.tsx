import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-35 bg-green-500 text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">
          Klaar om financieel slim te worden?
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Join GeldBuddies en begin vandaag nog met het verbeteren van je
          financiële vaardigheden op een leuke manier!
        </p>
        <Button
          asChild
          className="text-green-500 bg-white hover:bg-white/90 text-lg font-semibold px-6 py-7 rounded-full"
        >
          <Link href="/game">Start the game - Het is gratis!</Link>
        </Button>
      </div>
    </section>
  );
}
