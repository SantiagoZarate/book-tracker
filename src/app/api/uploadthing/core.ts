import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

import { ratelimit } from '@/app/lib/rate-limit';

const f = createUploadthing();

// Fake auth function
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function auth(_req: Request) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return { id: 'fakeId' };
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 8 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // Rate limit the upload
      const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';

      const { success } = await ratelimit.limit(ip);

      if (!success) {
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw new UploadThingError('Rate limit exceeded');
      }

      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      if (!user) throw new UploadThingError('Unauthorized');

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId);

      console.log('file url', file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
