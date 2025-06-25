'use client';

import { Button, type buttonVariants } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { type VariantProps } from 'class-variance-authority';
import { useRouter } from 'next/navigation';

export function LogOutButton({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>) {
  const router = useRouter();

  const onClick = () => {
    void authClient.signOut().then(() => {
      router.refresh();
    });
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      className={cn('', className)}
      {...props}
    >
      Logout
    </Button>
  );
}
