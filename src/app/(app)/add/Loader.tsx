import { MotionList } from "@/app/components/motion/MotionList";
import { MotionListItem } from "@/app/components/motion/MotionListItem";

export function Loader() {
  return (
    <MotionList className="flex flex-col divide-y">
      {Array(8)
        .fill(1)
        .map((n, idx) => (
          <MotionListItem key={idx}>
            <Skeleton />
          </MotionListItem>
        ))}
    </MotionList>
  );
}

export function Skeleton() {
  return (
    <div className="[&_div]:rounded-lg [&_div]:bg-input animate-pulse flex items-center justify-between w-full p-2">
      <section className="flex flex-col gap-2 flex-1">
        <div className="h-5 w-1/3" />
        <ul className="flex gap-2">
          <div className="h-4 w-12" />
          <div className="h-4 w-12" />
        </ul>
      </section>
      <section>
        <div className="w-16 h-8" />
      </section>
    </div>
  );
}
