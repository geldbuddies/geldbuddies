import { CTASection } from '@/components/sections/cta-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { HeroSection } from '@/components/sections/hero-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { auth } from '@/server/auth';
import { api } from '@/trpc/server';
import { headers } from 'next/headers';

export default async function HomePage() {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  if (session?.user) {
    void api.post.hello.prefetch({
      text: 'client',
    });
  }

  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
