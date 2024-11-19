import { TrackBar } from "@/app/components/track/TrackBar";
import { trackService } from "@/services/track/track.service";
import moment from "moment";
import { AddSessionButton } from "./AddSessionButton";
import { DeleteButton } from "./DeleteButton";

interface Props {
  params: {
    trackid: string;
  };
}

export default async function page({ params: { trackid } }: Props) {
  const track = await trackService.getOne({
    id: trackid,
  });

  const totalPagesRead = track.sessions.reduce(
    (acc, curr) => curr.pagesRead + acc,
    0
  );

  const completedPercentage = (
    (totalPagesRead / track.book.totalPages) *
    100
  ).toFixed(1);

  const pagesLeft = track.book.totalPages - totalPagesRead;

  return (
    <section className="p-2">
      <header>
        <p className="text-3xl font-semibold">{track.book.title}</p>
        <p className="text-sm">{moment().from(track.startedAt)}</p>
      </header>
      <section className="flex flex-col items-end">
        <p>{completedPercentage}%</p>
        <TrackBar completedPercentage={completedPercentage} />
        <p>{pagesLeft} Pages left</p>
      </section>
      <section>
        <DeleteButton id={trackid} />
        <AddSessionButton id={trackid} />
      </section>
    </section>
  );
}
