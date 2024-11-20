"use client";

import { TrackBar } from "@/app/components/track/TrackBar";
import { ProgressBar } from "@/app/components/ui/ProgressBar";
import moment from "moment";
import { useState } from "react";
import { useTracker } from "../hooks/useTracker";
import { DeleteButton } from "./DeleteButton";
import { SessionForm } from "./SessionForm";
import { Sessions } from "./Sessions";

export default function Page() {
  const { track } = useTracker();
  const totalPagesRead = track.sessions.reduce(
    (acc, curr) => curr.pagesRead + acc,
    0
  );

  const [pagesCount, setPagesCount] = useState<number>(totalPagesRead);

  const handleIncreasePage = () => {
    if (pagesCount >= track.book.totalPages) return;
    setPagesCount(pagesCount + 1);
  };

  const handleDecreasePage = () => {
    if (pagesCount <= totalPagesRead) return;
    setPagesCount(pagesCount - 1);
  };

  const completedPercentage = (
    (totalPagesRead / track.book.totalPages) *
    100
  ).toFixed(1);

  const futureCompletedPercentage = (
    (pagesCount / track.book.totalPages) *
    100
  ).toFixed(1);

  const pagesLeft = track.book.totalPages - totalPagesRead;

  return (
    <section className="p-2 flex flex-col gap-4">
      <header>
        <p className="text-3xl font-semibold">{track.book.title}</p>
        <p className="text-sm">{moment().from(track.startedAt)}</p>
      </header>
      <section className="flex flex-col items-end">
        <p>{completedPercentage}%</p>
        <TrackBar>
          <ProgressBar percentaje={completedPercentage} />
          <ProgressBar
            percentaje={futureCompletedPercentage}
            variant={"future"}
          />
        </TrackBar>
        <p>{pagesLeft} Pages left</p>
      </section>
      <section>
        <DeleteButton />
      </section>
      <SessionForm
        totalPages={track.book.totalPages}
        onDecreasePage={handleDecreasePage}
        onIncreasePage={handleIncreasePage}
        initialPages={totalPagesRead}
        pagesCount={pagesCount}
      />
      <Sessions />
    </section>
  );
}
