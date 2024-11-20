import { PropsWithChildren } from "react";

export function TrackBar({ children }: PropsWithChildren) {
  return (
    <section className="relative w-full h-2 rounded-md bg-input">
      {children}
    </section>
  );
}

interface ProgressBarProps {
  percentaje: string;
}

export function ProgressBar({ percentaje }: ProgressBarProps) {
  return (
    <div
      style={{ width: `${percentaje}%` }}
      className="h-full absolute left-0 top-0 bg-green-700 z-20 rounded-md"
    />
  );
}
