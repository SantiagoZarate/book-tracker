import { PropsWithChildren } from 'react';

export function TrackBar({ children }: PropsWithChildren) {
  return (
    <section className="relative h-2 w-full rounded-md bg-input">
      {children}
    </section>
  );
}
