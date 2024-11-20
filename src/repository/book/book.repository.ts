import { db } from '@/db/db';
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
};

export { bookRepository };
