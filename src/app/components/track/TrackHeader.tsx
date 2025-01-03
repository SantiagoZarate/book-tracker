import { TrackMenu } from '@/app/[locale]/(app)/[trackid]/TrackMenu';
import { useTracker } from '@/app/hooks/useTracker';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import { BackArrowMicroIcon } from '../icons/BackArrowMicroIcon';
import { Button } from '../ui/button';

export function TrackHeader() {
  const { track } = useTracker();

  return (
    <header className="relative flex flex-col gap-8 p-4">
      <Link className="absolute -top-8" href={'/home'}>
        <Button variant={'icon'}>
          <BackArrowMicroIcon />
        </Button>
      </Link>
      <section className="flex gap-2">
        <section className="flex-1">
          <p className="text-3xl font-semibold">{track.book.title}</p>
          <p className="text-sm">
            {formatDistance(new Date(track.startedAt), new Date())}
          </p>
        </section>
        <TrackMenu />
      </section>
    </header>
  );
}
