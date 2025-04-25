import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section
      className="py-20 flex items-center text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/hero-bg.png')",
        backgroundColor: "#0F172A",
      }}
    >
      {" "}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 ">
            <h1 className="text-4xl md:text-5xl text-primary-foreground font-bold mb-6">
              Leer slim omgaan met geld op een leuke manier
            </h1>
            <p className="text-xl mb-8 text-primary-foreground">
              GeldBuddies helpt jongeren financieel zelfredzaam te worden door
              middel van een interactieve game.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="bg-green-500 hover:bg-green-600 text-white text-lg px-6 py-4"
              >
                <Link href="/game">Start de Game</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/join">Join Classroom</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/account">Log in of maak een account</Link>
              </Button>
              <Button asChild variant="default" size="lg">
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
