import Link from 'next/link';
import { Button } from '../../ui/button';
import { HeroTracks } from './hero-tracks';

export function HeroSection() {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(20em,1fr))] place-content-center gap-8 py-20">
      <section className="flex flex-col justify-center gap-4">
        <h1 className="text-4xl font-bold">
          Your Reading, Your Story, Your Progress
        </h1>
        <p className="text-secondary">
          Monitor your reading sessions and watch your progress grow.
        </p>
        <Link href={'/signin'}>
          <Button>Start Tracking Now!</Button>
        </Link>
      </section>
      <HeroTracks />
    </section>
  );
}
