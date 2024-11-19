import { dbCredentials } from "@/config/dbCredentials";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dbCredentials,
  dialect: "turso",
  schema: "./src/db/schemas/index.ts",
  out: "./src/db/migrations",
  strict: true,
  verbose: true,
});
