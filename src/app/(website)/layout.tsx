import NavigationBar from "@/components/navigation/navigation-bar";
import Link from "next/link";
import { Fragment } from "react";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <header className="sticky top-0 z-50 w-full bg-primary text-primary-foreground">
        <NavigationBar />
      </header>
      <main className="min-h-[calc(100vh-64px)]">{children}</main>
      <footer className="bg-primary py-8 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">GeldBuddies</h3>
              <p>Leer op een leuke manier omgaan met geld en financiën.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline">
                    Over Ons
                  </Link>
                </li>
                <li>
                  <Link href="/game" className="hover:underline">
                    Game
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p>
                Email: info@geldbuddies.nl
                <br />
                Hogeschool Utrecht
                <br />
                Padualaan 99
                <br />
                3584 CH Utrecht
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p>
              &copy; {new Date().getFullYear()} GeldBuddies. Alle rechten
              voorbehouden.
            </p>
          </div>
        </div>
      </footer>
    </Fragment>
  );
}
