'use client';

import { AddMicroIcon } from '@/app/components/icons/AddMicroIcon';
import { BackArrowMicroIcon } from '@/app/components/icons/BackArrowMicroIcon';
import { MotionLoaderButton } from '@/app/components/motion/MotionLoaderButton';
import { IconButton } from '@/app/components/ui/button';
import { Form } from '@/app/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { createBookAction } from './action';
import { CreateBookSchema, createBookSchema } from './bookSchema';

export const stepsPaths = {
  1: 'step-one',
  2: 'step-two',
  3: 'step-three',
} as const;

export type StepsPath = (typeof stepsPaths)[keyof typeof stepsPaths];

export function CreateForm({ children }: PropsWithChildren) {
  const router = useRouter();
  const path = usePathname();
  const step = path.split('/')[3];

  const form = useForm<CreateBookSchema>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      author: '',
      genres: [],
      pages: 0,
      title: '',
      cover: undefined,
    },
  });

  const { execute } = useServerAction(createBookAction, {
    onSuccess() {
      toast('Book created succesfully');
    },
  });

  const handleSubmit = (data: CreateBookSchema) => {
    execute(data);
    console.log({ data });
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="grid grid-cols-2 gap-4"
    >
      <Form {...form}>
        {children}
        <footer className="col-span-2 flex gap-2 *:flex-1">
          <IconButton
            disabled={step === 'step-one'}
            onClick={() => {
              if (step === 'step-two') {
                router.replace('/create/step-one');
              }
              if (step === 'step-three') {
                router.replace('/create/step-two');
              }
            }}
            icon={<BackArrowMicroIcon />}
            type="button"
          >
            back
          </IconButton>
          {step !== 'step-three' ? (
            <IconButton
              onClick={() => {
                if (step === 'step-one') {
                  router.replace('/create/step-two');
                }
                if (step === 'step-two') {
                  router.replace('/create/step-three');
                }
              }}
              icon={<AddMicroIcon />}
              type="button"
            >
              Next
            </IconButton>
          ) : (
            <MotionLoaderButton icon={<AddMicroIcon />} isPending={false}>
              create
            </MotionLoaderButton>
          )}
        </footer>
      </Form>
    </form>
  );
}
