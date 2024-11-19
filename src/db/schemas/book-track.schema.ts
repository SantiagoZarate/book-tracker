import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const bookSchema = sqliteTable("book", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => nanoid()),
  title: text("title").notNull(),
  author: text("author"),
  totalPages: integer("total_pages").notNull().default(1),
});

export const trackSchema = sqliteTable("track", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => nanoid()),
  pagesAlreadyRead: integer("pages_already_read").notNull().default(0),
  isCompleted: integer("is_completed", { mode: "boolean" })
    .notNull()
    .default(false),
  startedAt: text("started_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP()`),
  bookID: text("book_id")
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
    .default(sql`CURRENT_TIMESTAMP()`),
  trackID: text("track_id")
    .notNull()
    .references(() => trackSchema.id, { onDelete: "cascade" }),
});

export const trackRelations = relations(trackSchema, ({ one, many }) => ({
  book: one(bookSchema, {
    fields: [trackSchema.bookID],
    references: [bookSchema.id],
  }),
  comments: many(commentSchema),
}));

export const bookRelations = relations(bookSchema, ({ many }) => ({
  tracks: many(trackSchema),
}));

export const commentRelations = relations(commentSchema, ({ one }) => ({
  track: one(trackSchema, {
    fields: [commentSchema.trackID],
    references: [trackSchema.id],
  }),
}));
