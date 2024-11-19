import { PlusMicroIcon } from "@/app/components/icons/PlusMicroIcon";
import { TrackBar } from "@/app/components/track/TrackBar";
import { Button } from "@/app/components/ui/button";
import { trackService } from "@/services/track/track.service";
import moment from "moment";
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

  const completedPercentage = (
    (track.pagesAlreadyRead / track.book.totalPages) *
    100
  ).toFixed(1);

  const pagesLeft = track.book.totalPages - track.pagesAlreadyRead;

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
        <DeleteButton />
        <Button>
          <PlusMicroIcon />
        </Button>
      </section>
    </section>
  );
}
