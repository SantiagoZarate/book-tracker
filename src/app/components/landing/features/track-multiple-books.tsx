import { MiniTrack } from './mini-track';

export function TrackMultipleBooks() {
  return (
    <ul className="pointer-events-none z-10 flex w-full flex-col items-center gap-1 [mask-image:linear-gradient(0deg,transparent,black_30%,black_70%,transparent)]">
      {Array(7)
        .fill(1)
        .map((_, index) => (
          <MiniTrack key={index} order={index + 1} />
        ))}
    </ul>
  );
}
