'use server';

import { sessionService } from '@/services/session/sessionService';
import { trackService } from '@/services/track/track.service';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createServerAction } from 'zsa';

export const deleteTrackAction = createServerAction()
  .input(
    z.object({
      trackId: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    try {
      await trackService.delete({ id: input.trackId });
    } catch (error) {
      console.log(error);
    }
    revalidatePath('/', 'page');
    redirect('/');
  });

export const addSessionAction = createServerAction()
  .input(
    z.object({
      trackId: z.string(),
      pages: z.coerce.number().min(1, 'Session must at least have one page'),
    }),
  )
  .handler(async ({ input }) => {
    try {
      await sessionService.create({
        content: '',
        pagesRead: input.pages,
        trackId: input.trackId,
      });
    } catch (error) {
      console.log(error);
    }
    revalidatePath('/' + input.trackId, 'layout');
  });

export const toggleCompleteAction = createServerAction()
  .input(
    z.object({
      trackId: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    try {
      await trackService.toggleComplete({ id: input.trackId });
    } catch (error) {
      console.log(error);
    }
    revalidatePath('/' + input.trackId, 'layout');
  });

export const deleteSessionAction = createServerAction()
  .input(
    z.object({
      sessionId: z.string(),
      trackId: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    try {
      await sessionService.delete({ id: input.sessionId });
    } catch (error) {
      console.log(error);
    }
    revalidatePath('/' + input.trackId, 'layout');
  });
