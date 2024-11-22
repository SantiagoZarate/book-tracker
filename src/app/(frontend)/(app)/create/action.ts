'use server';

import { z } from 'zod';
import { createServerAction } from 'zsa';
import { createBookSchema } from './bookSchema';

export const createBookAction = createServerAction()
  .input(createBookSchema)
  .handler(async ({ input }) => {
    await new Promise((resolve) => setTimeout(() => resolve(true), 2000));
    console.log({ input });
  });

export const checkBookExistsAction = createServerAction()
  .input(z.object({ title: z.string() }))
  .handler(({ input }) => {
    console.log({ input });
    console.log('EXECUTING ACTION');
  });
