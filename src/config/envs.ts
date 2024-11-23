import { config } from 'dotenv';
import { z } from 'zod';

const path = `.env.${process.env.NODE_ENV}`;
config({ path });

const envsSchema = z.object({
  mode: z.enum(['production', 'development', 'test']).default('development'),
  auth: z.object({
    github: z.object({
      id: z.string(),
      secret: z.string(),
    }),
    secret: z.string(),
    adminEmail: z.string().email(),
  }),
  db: z.object({
    url: z.string(),
    token: z.string(),
  }),
});

type EnvsType = z.infer<typeof envsSchema>;

const envs: EnvsType = {
  mode: process.env.NODE_ENV,
  auth: {
    github: {
      id: process.env.GITHUB_CLIENT_ID ?? '',
      secret: process.env.GITHUB_CLIENT_SECRET ?? '',
    },
    secret: process.env.NEXTAUTH_SECRET ?? '',
    adminEmail: process.env.ADMIN_EMAIL ?? '',
  },
  db: {
    token: process.env.TURSO_TOKEN ?? '',
    url: process.env.TURSO_URL ?? '',
  },
};

export default envsSchema.parse(envs);
