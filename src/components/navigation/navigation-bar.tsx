import Link from 'next/link';

export default function NavigationBar() {
  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                GeldBuddies
              </span>
            </Link>
          </div>

          <ul className="flex items-center space-x-8">
            <li>
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium"
              >
                Over Ons
              </Link>
            </li>
            <li>
              <Link
                href="/game"
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium"
              >
                Game
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/game"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
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
