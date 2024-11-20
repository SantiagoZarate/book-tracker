import { trackService } from "@/services/track/track.service";
import { MotionList } from "../components/motion/MotionList";
import { MotionListItem } from "../components/motion/MotionListItem";
import { BookTrackItem } from "./BookTrackItem";

export default async function page() {
  const tracks = await trackService.getAll();

  return (
    <section className="flex flex-col gap-8">
      <header>
        <p>HOME</p>
      </header>
      <section>
        <p>Tracks Lists</p>
        <MotionList className="flex flex-col divide-y">
          {tracks.map((track) => (
            <MotionListItem key={track.id}>
              <BookTrackItem track={track} />
            </MotionListItem>
          ))}
        </MotionList>
      </section>
    </section>
  );
}
