import { relations } from "drizzle-orm";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";
import { trackSchema } from "./track.schema";

export const bookSchema = sqliteTable("book", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => nanoid()),
  title: text("title").notNull(),
  author: text("author").notNull(),
  totalPages: integer("total_pages").notNull().default(1),
});

export const bookRelations = relations(bookSchema, ({ many }) => ({
  tracks: many(trackSchema),
  genres: many(booksToGenres),
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
