import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const bookTrackSchema = sqliteTable("book_track", {
  id: text("id"),
});
