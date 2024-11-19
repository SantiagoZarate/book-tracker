import { trackService } from "@/services/track/track.service";
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
        <ul className="flex flex-col divide-y">
          {tracks.map((track) => (
            <BookTrackItem key={track.id} track={track} />
          ))}
        </ul>
      </section>
    </section>
  );
}
