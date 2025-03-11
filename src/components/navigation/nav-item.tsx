import { Button } from '@/components/ui/button';
import Link from 'next/link';

export type NavItemProps = {
  label: string;
  href: string;
  isButton?: boolean;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
};

export function NavItem({ label, href, isButton = false, variant = 'default' }: NavItemProps) {
  if (isButton) {
    return (
      <Button asChild variant={variant}>
        <Link href={href}>{label}</Link>
      </Button>
    );
  }

  return (
    <Button
      asChild
      variant="ghost"
      className="text-foreground hover:text-primary dark:text-foreground dark:hover:text-primary"
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
}
