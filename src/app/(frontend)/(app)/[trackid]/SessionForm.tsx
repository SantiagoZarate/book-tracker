'use client';

import { EditSquareMicroIcon } from '@/app/components/icons/EditSquareMicroIcon';
import { Button } from '@/app/components/ui/button';
import { SectionHeader } from '@/app/components/ui/section';
import { fadeInAndOut } from '@/app/lib/motion-animations';
import { AnimatePresence, motion } from 'framer-motion';
import { nanoid } from 'nanoid';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { useTracker } from '../../../hooks/useTracker';
import { addSessionAction } from './actions';

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
      toast('Session added correctly');
    },
  });

  const pagesReadDuringThisSession = pagesCount - initialPages;

  const handleAddSession = async () => {
    addSession({
      ...track,
      sessions: [
        ...track.sessions,
        {
          pagesRead: pagesReadDuringThisSession,
          createdAt: new Date().toString(),
          content: 'nueva session',
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
    <>
      <SectionHeader
        description="How many pages did you read?"
        icon={<EditSquareMicroIcon />}
        title="Add new session"
      />
      <form
        className="relative flex items-center gap-2"
        action={handleAddSession}
      >
        <AnimatePresence>
          {pagesCount !== initialPages && (
            <motion.p {...fadeInAndOut} className="absolute -bottom-4 text-xs">
              {pagesReadDuringThisSession} pages read during this session
            </motion.p>
          )}
        </AnimatePresence>
        <section className="flex flex-1 divide-x divide-primary overflow-hidden rounded-lg bg-input">
          <button
            type="button"
            disabled={isPending || pagesCount === initialPages}
            onClick={onDecreasePage}
            className="aspect-square px-4 transition hover:bg-background disabled:bg-gray-400"
          >
            -
          </button>
          <p className="flex-1 p-2 text-center">{pagesCount}</p>
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
    </>
  );
}
