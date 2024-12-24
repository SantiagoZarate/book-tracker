import { BookTrackItem } from '@/app/[locale]/(app)/home/BookTrackItem';
import { MotionList } from '../../motion/MotionList';
import { MotionListItem } from '../../motion/MotionListItem';
import { books } from './books';
import './floating-tracks.css';

export function HeroTracks() {
  return (
    <MotionList className="book-tracks relative flex flex-col gap-4 p-4">
      {books.map((b) => (
        <MotionListItem
          layout
          className="rounded-lg border border-border bg-primary/5"
          key={b.id}
        >
          <BookTrackItem track={b} />
        </MotionListItem>
      ))}
      <div className="absolute inset-0 z-0 m-auto aspect-square w-[50%] rounded-full bg-green-600 opacity-80 blur-3xl"></div>
      <div className="absolute inset-0 z-0 mx-auto mt-auto aspect-square w-[20%] translate-x-20 rounded-full bg-green-100 opacity-80 blur-3xl"></div>
    </MotionList>
  );
}
