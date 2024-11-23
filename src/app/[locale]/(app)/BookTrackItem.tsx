import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/components/ui/tooltip';
import { TrackBookPagesDTO } from '@/shared/dtos/trackDTO';
import Link from 'next/link';
import { TrackBar } from '../../components/track/TrackBar';
import { ProgressBar } from '../../components/ui/ProgressBar';

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
        <TooltipTrigger className="w-full">
          <Link
            href={'/' + track.id}
            className={`m-1 flex w-full flex-col gap-1 rounded-md p-2 transition hover:bg-secondary ${
              track.isCompleted && 'bg-green-100'
            }`}
          >
            <header className="flex items-center justify-between">
              <p className="text-sm font-bold">{track.book.title}</p>
              <p className="rounded-lg bg-secondary p-2 text-xs font-bold">
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
