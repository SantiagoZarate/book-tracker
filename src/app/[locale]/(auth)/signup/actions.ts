'use server';

import { userService } from '@/services/user/user.service';
import console from 'console';
import { redirect } from 'next/navigation';
import { createServerAction, ZSAError } from 'zsa';
import { signupSchema } from '../authSchemas';

export const registerUserAction = createServerAction()
  .input(signupSchema)
  .handler(async ({ input }) => {
    try {
      await userService.register({
        email: input.email,
        password: input.password,
        username: input.username,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log({ error });
        throw new ZSAError('ERROR', error.message);
      }
    }
    redirect('/signin');
  });
