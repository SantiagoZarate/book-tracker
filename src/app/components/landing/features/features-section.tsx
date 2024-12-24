import { FeatureCard } from './feature-card';
import { StoreSession } from './store-session';
import { TrackMultipleBooks } from './track-multiple-books';

export function FeaturesSection() {
  return (
    <section className="grid grid-cols-3 gap-4">
      <FeatureCard
        title="Store sessions"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Id fuga
            magnam enim veniam explicabo, dicta minus"
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
        title="Store sessions"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Id fuga
            magnam enim veniam explicabo, dicta minus"
      >
        <StoreSession />
      </FeatureCard>
    </section>
  );
}
