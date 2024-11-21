'use client';

import { TrackBar } from '@/app/components/track/TrackBar';
import { TrackHeader } from '@/app/components/track/TrackHeader';
import { ProgressBar } from '@/app/components/ui/ProgressBar';
import { useEffect, useState } from 'react';
import { useTracker } from '../../../hooks/useTracker';
import { CompleteBanner } from './CompleteBanner';
import { StickyHeader } from './header/StickyHeader';
import { SessionForm } from './SessionForm';
import { Sessions } from './Sessions';

export default function Page() {
  const { track } = useTracker();
  const totalPagesRead = track.sessions.reduce(
    (acc, curr) => curr.pagesRead + acc,
    0,
  );

  const [pagesCount, setPagesCount] = useState<number>(totalPagesRead);

  // Not very proud of this
  // Without it, when a session i deleted
  // totalPagesRead and pagesCount get desynchronized
  useEffect(() => {
    setPagesCount(totalPagesRead);
  }, [totalPagesRead]);

  console.log({ pagesCount });

  const handleIncreasePage = () => {
    if (pagesCount >= track.book.totalPages) return;
    setPagesCount(pagesCount + 1);
  };

  const handleDecreasePage = () => {
    if (pagesCount <= totalPagesRead) return;
    setPagesCount(pagesCount - 1);
  };

  const completedPercentage = (
    (totalPagesRead / track.book.totalPages) *
    100
  ).toFixed(1);

  const futureCompletedPercentage = (
    (pagesCount / track.book.totalPages) *
    100
  ).toFixed(1);

  const pagesLeft = track.book.totalPages - totalPagesRead;

  return (
    <section className="relative flex flex-col">
      <StickyHeader />
      <TrackHeader />
      <section className="flex flex-col items-end p-4">
        <p>{completedPercentage}%</p>
        <TrackBar>
          <ProgressBar percentaje={completedPercentage} />
          <ProgressBar
            percentaje={futureCompletedPercentage}
            variant={'future'}
          />
        </TrackBar>
        <p>{pagesLeft} Pages left</p>
      </section>
      {track.isCompleted ? (
        <CompleteBanner />
      ) : (
        <SessionForm
          totalPages={track.book.totalPages}
          onDecreasePage={handleDecreasePage}
          onIncreasePage={handleIncreasePage}
          initialPages={totalPagesRead}
          pagesCount={pagesCount}
        />
      )}
      <Sessions />
    </section>
  );
}
