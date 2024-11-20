import { useTracker } from '@/app/hooks/useTracker';
import './stickyHeader.css';

export function StickyHeader() {
  const { track } = useTracker();

  return (
    <header className="sticky-header flex flex-col gap-1 border-b border-border p-2">
      <p className="text-sm font-semibold">{track.book.title}</p>
      <p className="text-xs">{track.book.author}</p>
    </header>
  );
}
