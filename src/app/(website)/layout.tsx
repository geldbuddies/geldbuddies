import NavigationBar from '@/components/navigation/navigation-bar';
import Link from 'next/link';
import { Fragment } from 'react';

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <header className="sticky top-0 z-50 w-full">
        <NavigationBar />
      </header>
      <main className="min-h-[calc(100vh-64px)]">{children}</main>
      <footer className="bg-muted dark:bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">GeldBuddies</h3>
              <p className="text-muted-foreground dark:text-muted-foreground">
                Leer op een leuke manier omgaan met geld en financiën.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-primary dark:text-primary hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-primary dark:text-primary hover:underline">
                    Over Ons
                  </Link>
                </li>
                <li>
                  <Link href="/game" className="text-primary dark:text-primary hover:underline">
                    Game
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-primary dark:text-primary hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p className="text-muted-foreground dark:text-muted-foreground">
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
          <div className="mt-8 pt-8 border-t border-border dark:border-border text-center text-muted-foreground dark:text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} GeldBuddies. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </Fragment>
  );
}
