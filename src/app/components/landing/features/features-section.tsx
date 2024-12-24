import { DiscoverBooks } from './discover-books';
import { FeatureCard } from './feature-card';
import { StoreSession } from './store-session';
import { TrackMultipleBooks } from './track-multiple-books';

export function FeaturesSection() {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,17em),1fr))] gap-4">
      <FeatureCard
        title="Store sessions"
        description="Track your reading time, pages covered, and progress for every book, ensuring you stay organized and motivated."
      >
        <StoreSession />
      </FeatureCard>
      <FeatureCard
        title="Track Multiple books"
        description="Easily monitor your reading journey for each book in one place."
      >
        <TrackMultipleBooks />
      </FeatureCard>
      <FeatureCard
        title="Discover new books"
        description="Find your next great read and expand your literary horizons effortlessly."
      >
        <DiscoverBooks />
      </FeatureCard>
    </section>
  );
}
