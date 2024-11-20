'use client';

import { MotionList } from '@/app/components/motion/MotionList';
import { MotionListItem } from '@/app/components/motion/MotionListItem';
import { Button } from '@/app/components/ui/button';
import { BookGenresDTO } from '@/shared/dtos/bookDTO';
import { AnimatePresence } from 'framer-motion';
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
              <Button
                disabled={isPending}
                onClick={() => execute({ bookId: book.id })}
                className="transition"
              >
                Add
              </Button>
            </section>
          </MotionListItem>
        ))}
      </AnimatePresence>
    </MotionList>
  );
}
