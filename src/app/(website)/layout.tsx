import NavigationBar from '@/components/navigation/navigation-bar';
import { Fragment } from 'react';

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <header className="sticky top-0 z-50 w-full">
        <NavigationBar />
      </header>
      <main className="min-h-[calc(100vh-64px)]">{children}</main>
      <footer className="bg-gray-100 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">GeldBuddies</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Leer op een leuke manier omgaan met geld en financiën.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Over Ons
                  </a>
                </li>
                <li>
                  <a href="/game" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Game
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p className="text-gray-600 dark:text-gray-400">
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
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} GeldBuddies. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </Fragment>
  );
}
