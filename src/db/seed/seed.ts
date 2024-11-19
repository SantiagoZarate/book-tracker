import { db } from "../db";
import { bookSchema, booksToGenres, genreSchema } from "../schemas";
import { MOCK_BOOKS } from "./mockup/book.mock";
import { MOCK_GENRES } from "./mockup/genre.mock";

async function seed() {
  try {
    // Manually drop db
    await db.delete(genreSchema);
    await db.delete(bookSchema);

    // Insert genres
    const genres = MOCK_GENRES.map((g) => ({ name: g }));
    await db.insert(genreSchema).values(genres);

    // Insert books
    await Promise.all(
      MOCK_BOOKS.map(async (book) => {
        const insertedBook = await db
          .insert(bookSchema)
          .values({
            author: book.author,
            title: book.title,
            totalPages: book.totalPages,
          })
          .returning({ id: bookSchema.id });

        const bookToGenres = book.genres.map((g) => ({
          bookId: insertedBook[0].id,
          genreName: g,
        }));

        await db.insert(booksToGenres).values(bookToGenres);
      })
    );
  } catch (error) {
    console.log(error);
  }
}

seed();
