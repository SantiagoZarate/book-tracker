import { relations, sql } from "drizzle-orm";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const bookSchema = sqliteTable("book", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => nanoid()),
  title: text("title").notNull(),
  author: text("author").notNull(),
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

export const trackRelations = relations(trackSchema, ({ one, many }) => ({
  book: one(bookSchema, {
    fields: [trackSchema.bookId],
    references: [bookSchema.id],
  }),
  comments: many(commentSchema),
}));

export const bookRelations = relations(bookSchema, ({ many }) => ({
  tracks: many(trackSchema),
  genres: many(booksToGenres),
}));

export const commentRelations = relations(commentSchema, ({ one }) => ({
  track: one(trackSchema, {
    fields: [commentSchema.trackId],
    references: [trackSchema.id],
  }),
}));

export const genreSchema = sqliteTable("genre", {
  name: text("name").primaryKey().notNull(),
});

export const genreRelations = relations(genreSchema, ({ many }) => ({
  books: many(booksToGenres),
}));

// MANY TO MANY TABLE

export const booksToGenres = sqliteTable(
  "book_to_genre",
  {
    bookId: text("book_id")
      .notNull()
      .references(() => bookSchema.id),
    genreName: text("genre_name")
      .notNull()
      .references(() => genreSchema.name),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.bookId, t.genreName] }),
  })
);
export const booksToGenresRelations = relations(booksToGenres, ({ one }) => ({
  genre: one(genreSchema, {
    fields: [booksToGenres.genreName],
    references: [genreSchema.name],
  }),
  book: one(bookSchema, {
    fields: [booksToGenres.bookId],
    references: [bookSchema.id],
  }),
}));
