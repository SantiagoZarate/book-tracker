'use client';

import { CalendarMicroIcon } from '@/app/components/icons/CalendarMicroIcon';
import { MotionList } from '@/app/components/motion/MotionList';
import { SessionContentForm } from '@/app/components/session/SessionContentForm';
import { SessionItem } from '@/app/components/session/SessionItem';
import { SectionHeader } from '@/app/components/ui/section';
import { opacity } from '@/app/lib/motion-animations';
import { SessionDTO } from '@/shared/dtos/sessionDTO';
import { AnimatePresence, motion } from 'framer-motion';
import moment from 'moment';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { useTracker } from '../../../hooks/useTracker';
import { deleteSessionAction } from './actions';

export function Sessions() {
  const { track, addSession } = useTracker();
  const { sessions } = track;
  const t = useTranslations();
  const { execute } = useServerAction(deleteSessionAction, {
    onSuccess() {
      toast('Session deleted succesfully');
    },
  });
  const [activeSession, setActiveSession] = useState<null | Omit<
    SessionDTO,
    'trackId'
  >>(null);

  useEffect(() => {
    function keydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveSession(null);
      }
    }

    document.addEventListener('keydown', keydown);
    return () => document.removeEventListener('keydown', keydown);
  }, []);

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
      {createPortal(
        <AnimatePresence>
          {activeSession && (
            <motion.section
              className="absolute inset-0 z-50 flex items-center justify-center bg-black/20"
              {...opacity}
            >
              <motion.section
                className="flex min-w-[500px] flex-col rounded-md border border-dashed border-input bg-secondary"
                layoutId={`session-${activeSession.id}`}
              >
                <section className="flex flex-col gap-2 p-1">
                  <motion.p
                    layoutId={`pages-${activeSession.id}`}
                    className="text-sm"
                  >
                    {activeSession.pagesRead} Pages
                  </motion.p>
                  <footer className="flex divide-x opacity-50 [&>:first-child]:pr-2 [&>:last-child]:pl-2">
                    <motion.p
                      layoutId={`date-${activeSession.id}`}
                      className="text-xs"
                    >
                      {activeSession.createdAt}
                    </motion.p>
                    <motion.p
                      layoutId={`since-${activeSession.id}`}
                      className="text-xs"
                    >
                      {moment(activeSession.createdAt)
                        .subtract(3, 'hours')
                        .fromNow()}
                    </motion.p>
                  </footer>
                </section>
                <SessionContentForm defaultContent={activeSession.content} />
              </motion.section>
            </motion.section>
          )}
        </AnimatePresence>,
        document.documentElement.querySelector('body')!,
      )}
      <SectionHeader
        description={t('track.sessions.description')}
        title={t('track.sessions.title')}
        icon={<CalendarMicroIcon />}
      />
      <MotionList className="flex flex-col gap-1">
        <AnimatePresence mode="popLayout">
          {sessions.map((session) => (
            <SessionItem
              onDelete={() => handleDeleteSession(session.id)}
              onSelect={() => setActiveSession(session)}
              session={session}
              key={session.id}
            />
          ))}
        </AnimatePresence>
      </MotionList>
    </>
  );
}
