import { trackService } from '@/services/track/track.service';
import Link from 'next/link';
import { MotionList } from '../../components/motion/MotionList';
import { MotionListItem } from '../../components/motion/MotionListItem';
import { BookTrackItem } from './BookTrackItem';

export default async function page() {
  const tracks = await trackService.getAll();

  return (
    <section className="flex flex-col gap-8">
      <header>
        <p>HOME</p>
      </header>
      <section>
        <p>Tracks Lists</p>
        {tracks.length === 0 ? (
          <Link href={'/add'} className="group">
            <section className="m-2 flex items-center justify-center rounded-sm bg-secondary py-24 transition group-hover:-translate-y-1">
              <p>you havent add any book track, lets start!</p>
            </section>
          </Link>
        ) : (
          <MotionList className="flex flex-col divide-y">
            {tracks.map((track) => (
              <MotionListItem key={track.id}>
                <BookTrackItem track={track} />
              </MotionListItem>
            ))}
          </MotionList>
        )}
      </section>
    </section>
  );
}
