import Link from 'next/link';

export default function NavigationBar() {
  return (
    <nav className="w-full bg-background dark:bg-background shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary dark:text-primary">GeldBuddies</span>
            </Link>
          </div>

          <ul className="flex items-center space-x-8">
            <li>
              <Link
                href="/"
                className="text-foreground hover:text-primary dark:text-foreground dark:hover:text-primary font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-foreground hover:text-primary dark:text-foreground dark:hover:text-primary font-medium"
              >
                Over Ons
              </Link>
            </li>
            <li>
              <Link
                href="/game"
                className="text-foreground hover:text-primary dark:text-foreground dark:hover:text-primary font-medium"
              >
                Game
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-foreground hover:text-primary dark:text-foreground dark:hover:text-primary font-medium"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/game"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md transition-colors"
              >
                Start Nu
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
