import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { TrackBookDTO } from "@/shared/dtos/trackDTO";
import Link from "next/link";

interface Props {
  track: TrackBookDTO;
}

export function BookTrackItem({ track }: Props) {
  const percentageCompleted = (
    (track.pagesAlreadyRead / track.book.totalPages) *
    100
  ).toFixed(1);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={"/" + track.id}
            className="flex flex-col gap-1 p-2 hover:bg-secondary rounded-md transition m-1"
          >
            <header className="flex justify-between items-center">
              <p className="font-bold text-sm">{track.book.title}</p>
              <p className="text-xs rounded-lg bg-secondary p-2 font-bold">
                {percentageCompleted}%
              </p>
            </header>
            <footer className="relative w-full h-2 rounded-md bg-input">
              <div
                style={{ width: `${percentageCompleted}%` }}
                className="h-full absolute left-0 top-0 bg-green-700 z-10 rounded-md"
              />
            </footer>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{track.book.totalPages - track.pagesAlreadyRead} pages left</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
