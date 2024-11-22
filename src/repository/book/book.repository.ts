import { db } from '@/db/db';
import { bookSchema, booksToGenres } from '@/db/schemas';
import { BookGenresDTO, bookGenresSchemaDTO } from '@/shared/dtos/bookDTO';
import { eq, like } from 'drizzle-orm';
import { IBookRepository } from '.';

const bookRepository: IBookRepository = {
  async getAll({ query = '' }) {
    const data = await db.query.bookSchema.findMany({
      where: (table) => like(table.title, `%${query}%`),
      with: {
        genres: true,
      },
    });

    return data.map((d) => {
      const genres = d.genres.map((g) => ({ name: g.genreName }));
      const book = { ...d, genres } satisfies BookGenresDTO;
      return bookGenresSchemaDTO.parse(book);
    });
  },
  async getOne({ id }) {
    const data = await db.query.bookSchema.findFirst({
      where: (table) => eq(table.id, id),
      with: {
        genres: true,
      },
    });

    return bookGenresSchemaDTO.parse(data);
  },
  async bookExists(title) {
    const book = await db.query.bookSchema.findFirst({
      where: (table) => eq(table.title, title),
    });

    return book !== undefined;
  },
  async create(payload) {
    const result = await db.transaction(async (tx) => {
      const book = await tx
        .insert(bookSchema)
        .values({
          author: payload.author,
          title: payload.title,
          totalPages: payload.totalPages,
        })
        .returning({ id: bookSchema.id });

      const genresToBook = payload.genres.map((genre) => ({
        bookId: book[0].id,
        genreName: genre,
      }));

      await tx.insert(booksToGenres).values(genresToBook);

      return book;
    });

    return result[0];
  },
};

export { bookRepository };
