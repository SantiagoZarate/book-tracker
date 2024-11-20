import { PropsWithChildren } from "react";

export function TrackBar({ children }: PropsWithChildren) {
  return (
    <section className="relative w-full h-2 rounded-md bg-input">
      {children}
    </section>
  );
}
