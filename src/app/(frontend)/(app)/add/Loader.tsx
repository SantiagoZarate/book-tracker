import { MotionList } from '@/app/components/motion/MotionList';
import { MotionListItem } from '@/app/components/motion/MotionListItem';

export function Loader() {
  return (
    <MotionList className="flex flex-col divide-y">
      {Array(8)
        .fill(1)
        .map((_, idx) => (
          <MotionListItem key={idx}>
            <Skeleton />
          </MotionListItem>
        ))}
    </MotionList>
  );
}

export function Skeleton() {
  return (
    <div className="flex w-full animate-pulse items-center justify-between p-2 [&_div]:rounded-lg [&_div]:bg-input">
      <section className="flex flex-1 flex-col gap-2">
        <div className="h-5 w-1/3" />
        <ul className="flex gap-2">
          <div className="h-4 w-12" />
          <div className="h-4 w-12" />
        </ul>
      </section>
      <section>
        <div className="h-8 w-16" />
      </section>
    </div>
  );
}
