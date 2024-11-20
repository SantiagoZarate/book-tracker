import { useTracker } from "@/app/hooks/useTracker";
import "./stickyHeader.css";

export function StickyHeader() {
  const { track } = useTracker();

  return (
    <header className="sticky-header p-2 border-b border-border flex flex-col gap-1">
      <p className="text-sm font-semibold">{track.book.title}</p>
      <p className="text-xs">{track.book.author}</p>
    </header>
  );
}
