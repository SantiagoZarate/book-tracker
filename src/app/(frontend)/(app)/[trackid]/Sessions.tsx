'use client';

import { CalendarMicroIcon } from '@/app/components/icons/CalendarMicroIcon';
import { XMarkMicroIcon } from '@/app/components/icons/XMarkMicroIcon';
import { MotionList } from '@/app/components/motion/MotionList';
import { MotionListItem } from '@/app/components/motion/MotionListItem';
import { Button } from '@/app/components/ui/button';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { useTracker } from '../../../hooks/useTracker';
import { deleteSessionAction } from './actions';

export function Sessions() {
  const { track, addSession } = useTracker();
  const { sessions } = track;
  const { execute } = useServerAction(deleteSessionAction, {
    onSuccess() {
      toast('Session deleted succesfully');
    },
  });

  if (sessions.length === 0) {
    return (
      <section className="flex w-full items-center justify-center rounded-lg bg-secondary p-8">
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
    <section className="flex flex-col gap-2 p-2">
      <header className="flex items-center gap-2">
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
      <MotionList className="flex flex-col gap-1">
        <AnimatePresence mode="popLayout">
          {sessions.map((session) => (
            <MotionListItem
              className="flex justify-between rounded-sm border border-dashed border-input bg-secondary p-1"
              key={session.id}
              layout
            >
              <section className="flex flex-col gap-1">
                <p className="text-sm">{session.pagesRead} Pages</p>
                <p className="text-xs opacity-50">{session.createdAt}</p>
              </section>
              <form action={() => handleDeleteSession(session.id)}>
                <Button className="bg-background" variant={'icon'}>
                  <XMarkMicroIcon />
                </Button>
              </form>
            </MotionListItem>
          ))}
        </AnimatePresence>
      </MotionList>
    </section>
  );
}
