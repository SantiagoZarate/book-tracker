import { db } from '@/db/db';
import { trackSchema } from '@/db/schemas';
import {
  trackBookSchemaDTO,
  trackBookSessionsSchemaDTO,
} from '@/shared/dtos/trackDTO';
import { eq } from 'drizzle-orm';
import { TrackRepository } from '.';

const trackRepository: TrackRepository = {
  async getAll() {
    const data = await db.query.trackSchema.findMany({
      with: {
        book: true,
      },
    });
    return data.map((d) => trackBookSchemaDTO.parse(d));
  },
  async getOne({ id }) {
    const data = await db.query.trackSchema.findFirst({
      where: (table) => eq(table.id, id!),
      with: {
        book: true,
        sessions: true,
      },
    });
    return trackBookSessionsSchemaDTO.parse(data);
  },
  async create(payload) {
    const data = await db
      .insert(trackSchema)
      .values({
        bookId: payload.bookId,
      })
      .returning({ id: trackSchema.id });

    return data[0];
  },
  async delete({ id }) {
    const data = await db.delete(trackSchema).where(eq(trackSchema.id, id));
    return data.rowsAffected === 1;
  },
  async toggleCompleteState({ id }, completed) {
    const data = await db
      .update(trackSchema)
      .set({ isCompleted: !completed })
      .where(eq(trackSchema.id, id));

    return data.rowsAffected === 1;
  },
};

export { trackRepository };
