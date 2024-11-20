"use client";

import { CalendarMicroIcon } from "@/app/components/icons/CalendarMicroIcon";
import { XMarkMicroIcon } from "@/app/components/icons/XMarkMicroIcon";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { useTracker } from "../../hooks/useTracker";
import { deleteSessionAction } from "./actions";

export function Sessions() {
  const { track, addSession } = useTracker();
  const { sessions } = track;
  const { execute } = useServerAction(deleteSessionAction, {
    onSuccess() {
      toast("Session deleted succesfully");
    },
  });

  if (sessions.length === 0) {
    return (
      <section className="flex p-8 w-full bg-secondary rounded-lg items-center justify-center">
        There are no sessions for this track
      </section>
    );
  }

  const handleDeleteSession = (id: string) => {
    addSession({
      ...track,
      sessions: track.sessions.filter((s) => s.id !== id),
    });
    execute({ trackId: track.id, sessionId: id });
  };

  return (
    <section className="p-2 flex flex-col gap-2">
      <header className="flex gap-2 items-center">
        <span>
          <CalendarMicroIcon />
        </span>
        <section className="flex flex-col">
          <p className="text-sm font-semibold capitalize">previous sessions</p>
          <p className="text-xs opacity-50">
            Check the historical log for this track
          </p>
        </section>
      </header>
      <ul className=" flex flex-col gap-1">
        {sessions.map((session) => (
          <li
            key={session.id}
            className="flex justify-between rounded-sm bg-secondary border border-dashed border-input p-1"
          >
            <section className="flex flex-col gap-1">
              <p className="text-sm">{session.pagesRead} Pages</p>
              <p className="text-xs opacity-50">{session.createdAt}</p>
            </section>
            <Button
              onClick={() => handleDeleteSession(session.id)}
              className="bg-background"
              variant={"icon"}
            >
              <XMarkMicroIcon />
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}
