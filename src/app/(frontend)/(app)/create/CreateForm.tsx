'use client';

import { MotionLoaderButton } from '@/app/components/motion/MotionLoaderButton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { createBookAction } from './action';
import { CreateBookSchema, createBookSchema } from './bookSchema';

export function CreateForm() {
  const form = useForm<CreateBookSchema>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      pages: 1,
      author: '',
      title: '',
    },
  });

  const { execute, isPending } = useServerAction(createBookAction, {
    onSuccess() {
      toast('Book succesfully added');
      form.reset();
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
        <MotionLoaderButton className="col-span-2" isPending={isPending} />
      </Form>
    </form>
  );
}
