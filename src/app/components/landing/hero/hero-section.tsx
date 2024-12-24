import Link from 'next/link';
import { Button } from '../../ui/button';
import { HeroTracks } from './hero-tracks';

export function HeroSection() {
  return (
    <section className="grid grid-cols-2 gap-4 py-20">
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">
          Your Reading, Your Story, Your Progress
        </h1>
        <p className="text-secondary">
          Monitor your reading sessions and watch your progress grow.
        </p>
        <Link href={'/auth/login'}>
          <Button>Start Tracking Now!</Button>
        </Link>
      </section>
      <HeroTracks />
    </section>
  );
}
