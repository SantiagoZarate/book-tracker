'use client';

import { SessionDTO } from '@/shared/dtos/sessionDTO';
import { formatDistance } from 'date-fns';
import { motion } from 'framer-motion';
import { XMarkMicroIcon } from '../icons/XMarkMicroIcon';
import { MotionListItem } from '../motion/MotionListItem';
import { Button } from '../ui/button';

interface Props {
  session: Omit<SessionDTO, 'trackId'>;
  onSelect: () => void;
  onDelete: () => void;
}

export function SessionItem({ session, onSelect, onDelete }: Props) {
  return (
    <MotionListItem
      className="flex cursor-pointer justify-between rounded-sm border border-dashed border-input bg-secondary p-1"
      whileHover={{ x: 10, opacity: 0.6 }}
      layoutId={`session-${session.id}`}
      exit={{ opacity: 0 }}
      onClick={onSelect}
      key={session.id}
      layout
    >
      <section className="flex flex-col gap-1">
        <motion.p layoutId={`pages-${session.id}`} className="text-sm">
          {session.pagesRead} Pages
        </motion.p>
        <footer className="flex divide-x opacity-50 [&>:first-child]:pr-2 [&>:last-child]:pl-2">
          <motion.p layoutId={`date-${session.id}`} className="text-xs">
            {session.createdAt}
          </motion.p>
          <motion.p layoutId={`since-${session.id}`} className="text-xs">
            {formatDistance(new Date(session.createdAt), new Date())}
          </motion.p>
        </footer>
      </section>
      <form action={onDelete}>
        <Button
          className="bg-background"
          variant={'icon'}
          onClick={(e) => e.stopPropagation()}
        >
          <XMarkMicroIcon />
        </Button>
      </form>
    </MotionListItem>
  );
}
