"use client";

import { BackArrowMicroIcon } from "@/app/components/icons/BackArrowMicroIcon";
import { TrackBar } from "@/app/components/track/TrackBar";
import { Button } from "@/app/components/ui/button";
import { ProgressBar } from "@/app/components/ui/ProgressBar";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { useTracker } from "../../hooks/useTracker";
import { CompleteBanner } from "./CompleteBanner";
import { SessionForm } from "./SessionForm";
import { Sessions } from "./Sessions";
import { TrackMenu } from "./TrackMenu";

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
    <section className="p-4 flex flex-col gap-4">
      <header className="flex flex-col gap-8">
        <Button variant={"icon"}>
          <Link href={"/"}>
            <BackArrowMicroIcon />
          </Link>
        </Button>
        <section className="flex gap-2">
          <section className="flex-1">
            <p className="text-3xl font-semibold">{track.book.title}</p>
            <p className="text-sm">{moment().from(track.startedAt)}</p>
          </section>
          <TrackMenu />
        </section>
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
      {track.isCompleted ? (
        <CompleteBanner />
      ) : (
        <SessionForm
          totalPages={track.book.totalPages}
          onDecreasePage={handleDecreasePage}
          onIncreasePage={handleIncreasePage}
          initialPages={totalPagesRead}
          pagesCount={pagesCount}
        />
      )}
      <Sessions />
    </section>
  );
}
