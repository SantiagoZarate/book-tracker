'use client';

import { AddMicroIcon } from '@/app/components/icons/AddMicroIcon';
import { MotionList } from '@/app/components/motion/MotionList';
import { MotionListItem } from '@/app/components/motion/MotionListItem';
import { MotionLoaderButton } from '@/app/components/motion/MotionLoaderButton';
import { BookGenresDTO } from '@/shared/dtos/bookDTO';
import { AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { addBookAction } from './action';
import { GenreList } from './GenreList';

interface Props {
  books: BookGenresDTO[];
}

export function Books({ books }: Props) {
  const { execute, isPending } = useServerAction(addBookAction, {
    onSuccess: ({}) => {
      toast('Book added');
    },
  });

  const t = useTranslations();

  return (
    <MotionList className="flex flex-col divide-y overflow-hidden">
      <AnimatePresence mode="popLayout">
        {books.map((book) => (
          <MotionListItem layout key={book.id} className="p-2">
            <section className="flex w-full items-center justify-between">
              <section className="flex flex-col">
                <p>{book.title}</p>
                <GenreList genres={book.genres} />
              </section>
              <MotionLoaderButton
                onClick={() => execute({ bookId: book.id })}
                className="min-w-[80px]"
                icon={<AddMicroIcon />}
                isPending={isPending}
                iconPos="left"
              >
                {t('add.button')}
              </MotionLoaderButton>
            </section>
          </MotionListItem>
        ))}
      </AnimatePresence>
    </MotionList>
  );
}
