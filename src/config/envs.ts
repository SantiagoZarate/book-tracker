import { z } from 'zod';

const envsSchema = z.object({
  auth: z.object({
    github: z.object({
      id: z.string(),
      secret: z.string(),
    }),
    secret: z.string(),
  }),
});

type EnvsType = z.infer<typeof envsSchema>;

const envs: EnvsType = {
  auth: {
    github: {
      id: process.env.GITHUB_CLIENT_ID ?? '',
      secret: process.env.GITHUB_CLIENT_SECRET ?? '',
    },
    secret: process.env.NEXTAUTH_SECRET ?? '',
  },
};

export default envsSchema.parse(envs);
