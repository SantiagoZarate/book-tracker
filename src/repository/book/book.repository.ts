import { db } from "@/db/db";
import { bookGenresSchemaDTO } from "@/shared/dtos/bookDTO";
import { eq } from "drizzle-orm";
import { IBookRepository } from ".";

const bookRepository: IBookRepository = {
  async getAll() {
    const data = await db.query.bookSchema.findMany({
      with: {
        genres: true,
      },
    });

    return data.map((d) => bookGenresSchemaDTO.parse(d));
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
