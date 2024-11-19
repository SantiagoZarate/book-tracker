import { Config } from "@libsql/client";
import path from "node:path";

export const dbCredentials: Config = {
  url: `file:${path.join(process.cwd(), `/src/db/local.development.db`)}`,
};
