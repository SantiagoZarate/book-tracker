'use client';

import { CalendarMicroIcon } from '@/app/components/icons/CalendarMicroIcon';
import { MotionList } from '@/app/components/motion/MotionList';
import { SessionDialog } from '@/app/components/session/SessionDialog';
import { SessionItem } from '@/app/components/session/SessionItem';
import { SectionHeader } from '@/app/components/ui/section';
import { SessionDTO } from '@/shared/dtos/sessionDTO';
import { AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { useTracker } from '../../../hooks/useTracker';
import { addSessionContentAction, deleteSessionAction } from './actions';

export function Sessions() {
  const { track, addSession } = useTracker();
  const { sessions } = track;
  const t = useTranslations();
  const deleteSession = useServerAction(deleteSessionAction, {
    onSuccess() {
      toast('Session deleted succesfully');
    },
  });
  const addSessionContent = useServerAction(addSessionContentAction, {
    onSuccess() {
      toast('session content added succesfully');
      setActiveSession(null);
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
    deleteSession.execute({ trackId: track.id, sessionId: id });
  };

  const handleAddContent = (content: string) => {
    if (!activeSession) {
      return;
    }

    // Perform optimistic update
    const optimisticTrack = {
      ...track,
      sessions: track.sessions.map((s) =>
        s.id === activeSession.id ? { ...s, content } : s,
      ),
    };

    // Update local state
    addSession(optimisticTrack);

    addSessionContent.execute({
      sessionId: activeSession.id,
      content,
    });
  };

  return (
    <>
      {createPortal(
        <AnimatePresence>
          {activeSession && (
            <SessionDialog
              session={activeSession}
              onAddContent={handleAddContent}
            />
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
              onSelect={() => {
                console.log(session);
                setActiveSession(session);
              }}
              session={session}
              key={session.id}
            />
          ))}
        </AnimatePresence>
      </MotionList>
    </>
  );
}
