import { Config } from "@libsql/client";
import { resolve } from "node:path";

export const dbCredentials: Config = {
  url: `file:${resolve(__dirname, "../db/local.development.db")}`,
};
