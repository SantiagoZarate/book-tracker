'use client';

import { AddMicroIcon } from '@/app/components/icons/AddMicroIcon';
import { BackArrowMicroIcon } from '@/app/components/icons/BackArrowMicroIcon';
import { MotionLoaderButton } from '@/app/components/motion/MotionLoaderButton';
import { IconButton } from '@/app/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import MultipleSelector, {
  Option,
} from '@/app/components/ui/multiple-selector';
import { GenreDTO } from '@/shared/dtos/bookDTO';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { createBookAction } from '../action';
import { CreateBookSchema, createBookSchema } from '../bookSchema';

interface Props {
  genres: GenreDTO[];
}

export function CreateForm({ genres }: Props) {
  const multipleSelectorOptions: Option[] = genres.map((g) => ({
    label: g.name,
    value: g.name,
  }));

  const form = useForm<CreateBookSchema>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      pages: 1,
      author: '',
      title: '',
      genres: [],
      cover: undefined,
    },
  });

  const { execute, isPending } = useServerAction(createBookAction, {
    onSuccess() {
      toast('Book succesfully added');
      form.reset();
    },
    onError({ err }) {
      toast(err.message);
      form.setError('title', { message: err.message });
    },
  });

  const handleSubmit = async (payload: CreateBookSchema) => {
    execute(payload);
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="grid grid-cols-2 gap-4"
    >
      <Form {...form}>
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="The Lord Of The Rings" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="author"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input {...field} placeholder="J.R.R. Tolkien" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="pages"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of pages</FormLabel>
              <FormControl>
                <Input type="number" {...field} min={1} placeholder="232" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genres"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Genres</FormLabel>
              <FormControl>
                <MultipleSelector
                  {...field}
                  defaultOptions={multipleSelectorOptions}
                  placeholder="What is the genre of this book?"
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <footer className="col-span-2 flex gap-2 *:flex-1">
          <IconButton icon={<BackArrowMicroIcon />} type="button">
            back
          </IconButton>
          {true ? (
            <IconButton icon={<AddMicroIcon />} type="button">
              Next
            </IconButton>
          ) : (
            <MotionLoaderButton icon={<AddMicroIcon />} isPending={isPending}>
              create
            </MotionLoaderButton>
          )}
        </footer>
      </Form>
    </form>
  );
}
