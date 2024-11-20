import { dbCredentials } from '@/config/dbCredentials';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schemas/index';

const sqliteClient = createClient(dbCredentials);

export const db = drizzle({
  client: sqliteClient,
  logger: true,
  schema,
});
