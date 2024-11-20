import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { TrackBookPagesDTO } from "@/shared/dtos/trackDTO";
import Link from "next/link";
import { TrackBar } from "../components/track/TrackBar";
import { ProgressBar } from "../components/ui/ProgressBar";

interface Props {
  track: TrackBookPagesDTO;
}

export function BookTrackItem({ track }: Props) {
  const completedPercentage = (
    (track.pagesAlreadyRead / track.book.totalPages) *
    100
  ).toFixed(1);

  const pagesLeft = track.book.totalPages - track.pagesAlreadyRead;

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={"/" + track.id}
            className={`flex flex-col gap-1 p-2 hover:bg-secondary rounded-md transition m-1 ${
              track.isCompleted && "bg-green-100"
            }`}
          >
            <header className="flex justify-between items-center">
              <p className="font-bold text-sm">{track.book.title}</p>
              <p className="text-xs rounded-lg bg-secondary p-2 font-bold">
                {completedPercentage}%
              </p>
            </header>
            <TrackBar>
              <ProgressBar percentaje={completedPercentage} />
            </TrackBar>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{pagesLeft} pages left</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
