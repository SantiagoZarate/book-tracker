'use client';

import { CalendarMicroIcon } from '@/app/components/icons/CalendarMicroIcon';
import { XMarkMicroIcon } from '@/app/components/icons/XMarkMicroIcon';
import { MotionList } from '@/app/components/motion/MotionList';
import { MotionListItem } from '@/app/components/motion/MotionListItem';
import { Button } from '@/app/components/ui/button';
import { SectionHeader } from '@/app/components/ui/section';
import { AnimatePresence } from 'framer-motion';
import moment from 'moment';
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
      <section className="relative flex w-full items-center justify-center overflow-hidden rounded-lg border-4 border-border bg-secondary p-8 shadow-lg">
        <p className="text-xs font-bold capitalize opacity-65">
          There are no sessions for this track
        </p>
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
    <>
      <SectionHeader
        description="Check the historical log for this track"
        icon={<CalendarMicroIcon />}
        title="previous sessions"
      />
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
                <footer className="flex divide-x opacity-50 [&>:first-child]:pr-2 [&>:last-child]:pl-2">
                  <p className="text-xs">{session.createdAt}</p>
                  <p className="text-xs">
                    {moment(session.createdAt).subtract(3, 'hours').fromNow()}
                  </p>
                </footer>
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
    </>
  );
}
