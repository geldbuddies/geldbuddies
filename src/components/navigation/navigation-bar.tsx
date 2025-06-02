import Link from 'next/link';
import { NavItem, NavItemProps } from './nav-item';

const navItems: NavItemProps[] = [
  { label: 'Home', href: '/' },
  { label: 'Over Ons', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Docenten', href: '/dashboard' },
  { label: 'Analyse', href: '/analysis' },
  { label: 'Join Class', href: '/join', isButton: true, variant: 'outline' },
];

export default function NavigationBar() {
  return (
    <nav className="w-full bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-semibold">Geldbuddies</span>
          </Link>

          <ul className="hidden md:flex items-center space-x-4">
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
