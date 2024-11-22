import { dbCredentials } from '@/config/dbCredentials';
import envs from '@/config/envs';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schemas/index';

const sqliteClient = createClient(dbCredentials);

export const db = drizzle({
  client: sqliteClient,
  logger: envs.mode === 'development',
  schema,
});
