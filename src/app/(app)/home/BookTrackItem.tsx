import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/(app)/components/ui/tooltip";
import { BookTrack } from "../data/book-tracks";

interface Props {
  book: BookTrack;
}

export function BookTrackItem({ book }: Props) {
  const percentageCompleted = (
    (book.alreadyReadPages / book.totalPages) *
    100
  ).toFixed(1);

  return (
    <li className="flex gap-4">
      <figure className="aspect-[9/16] w-28">
        <img className="size-full" src={book.image} alt="" />
      </figure>
      <section className="flex flex-col gap-2">
        <p className="font-bold text-xl">{book.title}</p>
        <p>{percentageCompleted}%</p>
        <footer className="relative">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger className="relative w-full h-2 rounded-md bg-gray-700">
                <div
                  style={{ width: `${percentageCompleted}%` }}
                  className="h-full absolute left-0 top-0 bg-green-700 z-10 rounded-md"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{book.totalPages - book.alreadyReadPages} pages left</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </footer>
      </section>
    </li>
  );
}
