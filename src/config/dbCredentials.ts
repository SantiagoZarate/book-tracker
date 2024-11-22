import { Config } from '@libsql/client';
import path from 'node:path';
import envs from './envs';

export let dbCredentials: Config;

if (envs.mode === 'production') {
  dbCredentials = {
    url: envs.db.url,
    authToken: envs.db.token,
  };
} else {
  dbCredentials = {
    url: `file:${path.join(process.cwd(), `/src/db/local.development.db`)}`,
  };
}
