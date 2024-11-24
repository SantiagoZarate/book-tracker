'use client';

import { EditSquareMicroIcon } from '@/app/components/icons/EditSquareMicroIcon';
import { MotionLoaderButton } from '@/app/components/motion/MotionLoaderButton';
import { SectionHeader } from '@/app/components/ui/section';
import { fadeInAndOut } from '@/app/lib/motion-animations';
import { AnimatePresence, motion } from 'framer-motion';
import moment from 'moment';
import { nanoid } from 'nanoid';
import { useTranslations } from 'next-intl';
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
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss').toString(),
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

  const t = useTranslations();

  return (
    <>
      <SectionHeader
        description={t('track.form.description')}
        title={t('track.form.title')}
        icon={<EditSquareMicroIcon />}
      />
      <form
        className="relative flex flex-col items-center gap-2 sm:flex-row"
        action={handleAddSession}
      >
        <AnimatePresence>
          {pagesCount !== initialPages && (
            <motion.p {...fadeInAndOut} className="absolute -bottom-4 text-xs">
              {pagesReadDuringThisSession + t('track.form.currentSession')}
            </motion.p>
          )}
        </AnimatePresence>
        <section className="flex w-full flex-1 divide-x divide-primary overflow-hidden rounded-lg bg-input">
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
        <MotionLoaderButton
          className="w-full min-w-[150px] sm:w-fit"
          isPending={isPending}
          disabled={pagesCount === initialPages}
        >
          {t('track.form.add')}
        </MotionLoaderButton>
      </form>
    </>
  );
}
