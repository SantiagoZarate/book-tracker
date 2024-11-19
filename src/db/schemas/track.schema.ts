import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";
import { bookSchema } from "./book-track.schema";

export const trackSchema = sqliteTable("track", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => nanoid()),
  isCompleted: integer("is_completed", { mode: "boolean" })
    .notNull()
    .default(false),
  startedAt: text("started_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  bookId: text("book_id")
    .notNull()
    .references(() => bookSchema.id, { onDelete: "cascade" }),
});

export const commentSchema = sqliteTable("comment", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => nanoid()),
  content: text("content").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  trackId: text("track_id")
    .notNull()
    .references(() => trackSchema.id, { onDelete: "cascade" }),
});

export const sessionSchema = sqliteTable("session", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => nanoid()),
  content: text("content").notNull(),
  pagesRead: text("pages_read").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  trackId: text("track_id")
    .notNull()
    .references(() => trackSchema.id, { onDelete: "cascade" }),
});

export const trackRelations = relations(trackSchema, ({ one, many }) => ({
  book: one(bookSchema, {
    fields: [trackSchema.bookId],
    references: [bookSchema.id],
  }),
  comments: many(commentSchema),
  sessions: many(sessionSchema),
}));

export const commentRelations = relations(commentSchema, ({ one }) => ({
  track: one(trackSchema, {
    fields: [commentSchema.trackId],
    references: [trackSchema.id],
  }),
}));

export const sessionRelations = relations(sessionSchema, ({ one }) => ({
  track: one(trackSchema, {
    fields: [sessionSchema.trackId],
    references: [trackSchema.id],
  }),
}));
