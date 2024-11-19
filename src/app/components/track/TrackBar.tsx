interface Props {
  completedPercentage: string;
}

export function TrackBar({ completedPercentage }: Props) {
  return (
    <section className="relative w-full h-2 rounded-md bg-input">
      <div
        style={{ width: `${completedPercentage}%` }}
        className="h-full absolute left-0 top-0 bg-green-700 z-10 rounded-md"
      />
    </section>
  );
}
