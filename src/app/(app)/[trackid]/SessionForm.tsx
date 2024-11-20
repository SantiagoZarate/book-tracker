"use client";

import { Button } from "@/app/components/ui/button";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { useTracker } from "../hooks/useTracker";
import { addSessionAction } from "./actions";

interface Props {
  initialPages: number;
  totalPages: number;
  pagesCount: number;
  onIncreasePage: () => void;
  onDecreasePage: () => void;
}

export function SessionForm({
  initialPages,
  totalPages,
  pagesCount,
  onDecreasePage,
  onIncreasePage,
}: Props) {
  const { addSession, track } = useTracker();
  const { execute, isPending } = useServerAction(addSessionAction, {
    onSuccess() {
      toast("Session added correctly");
    },
  });

  const handleAddSession = async () => {
    const pagesReadDuringThisSession = pagesCount - initialPages;

    addSession({
      ...track,
      sessions: [
        ...track.sessions,
        {
          pagesRead: pagesReadDuringThisSession,
          createdAt: new Date().toString(),
          content: "nueva session",
          id: nanoid(),
        },
      ],
    });
    execute({
      pages: pagesReadDuringThisSession,
      trackId: track.id,
    });
  };

  return (
    <section>
      <header>Add Session</header>
      <section className="">
        <form className="flex items-center gap-2" action={handleAddSession}>
          <section className="flex-1 flex bg-input divide-x divide-primary rounded-lg overflow-hidden">
            <button
              type="button"
              disabled={isPending || pagesCount === initialPages}
              onClick={onDecreasePage}
              className="disabled:bg-gray-400 transition aspect-square px-4 hover:bg-background"
            >
              -
            </button>
            <p className="flex-1 text-center p-2">{pagesCount}</p>
            <button
              type="button"
              disabled={isPending || pagesCount === totalPages}
              className="aspect-square px-4 transition hover:bg-background"
              onClick={onIncreasePage}
            >
              +
            </button>
          </section>
          <Button disabled={isPending || pagesCount === initialPages}>
            Add session
          </Button>
        </form>
      </section>
    </section>
  );
}
