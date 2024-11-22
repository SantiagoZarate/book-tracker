import { db } from '@/db/db';

class GenreRepository {
  async getAll() {
    const data = await db.query.genreSchema.findMany();
    return data;
  }
}

export const genreRepository = new GenreRepository();
