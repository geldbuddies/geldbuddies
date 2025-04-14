import Link from 'next/link';
import { NavItem, NavItemProps } from './nav-item';

const navItems: NavItemProps[] = [
  { label: 'Home', href: '/' },
  { label: 'Over Ons', href: '/about' },
  { label: 'Game', href: '/game' },
  { label: 'Contact', href: '/contact' },
  { label: 'Start Nu', href: '/game', isButton: true, variant: 'default' },
  { label: 'Join Class', href: '/join', isButton: true, variant: 'outline' },
  { label: 'Debug', href: '/debug' },
];

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

          <ul className="flex items-center space-x-4">
            {navItems.map((item, index) => (
              <li key={`${item.href}-${index}`}>
                <NavItem {...item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
