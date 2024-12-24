import { FeaturesSection } from '@/app/components/landing/features/features-section';
import { HeroSection } from '@/app/components/landing/hero/hero-section';

export default function LandingPage() {
  return (
    <main className="relative mx-auto grid h-full max-w-screen-lg grid-rows-[1fr_auto] flex-col gap-6">
      <HeroSection />
      <FeaturesSection />
    </main>
  );
}
