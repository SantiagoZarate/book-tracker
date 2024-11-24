import { db } from '@/db/db';
import { sessionSchema } from '@/db/schemas';
import {
  SessionDelete,
  SessionInsert,
  SessionRAW,
  SessionSelect,
} from '@/types/session.type';
import { TrackSelect } from '@/types/track.type';
import { eq, sql } from 'drizzle-orm';

const sessionRepository = {
  async getAllByTrack({ id }: TrackSelect) {
    const data = await db.query.sessionSchema.findMany({
      where: (table) => eq(table.id, id),
    });

    return data;
  },
  async getTotalPagesRead({ id }: TrackSelect) {
    const data = await db
      .select({ totalPages: sql<number>`SUM(${sessionSchema.pagesRead})` })
      .from(sessionSchema)
      .where(eq(sessionSchema.trackId, id));

    return data[0]?.totalPages || 0;
  },
  async insert(payload: SessionInsert) {
    const data = await db
      .insert(sessionSchema)
      .values({
        trackId: payload.trackId,
        pagesRead: payload.pagesRead,
        content: payload.content ?? '',
      })
      .returning({ id: sessionSchema.id });

    return data[0];
  },
  async delete({ id }: SessionDelete) {
    const data = await db.delete(sessionSchema).where(eq(sessionSchema.id, id));
    return data.rowsAffected === 1;
  },
  async addContent(
    { content }: Pick<SessionRAW, 'content'>,
    { id }: SessionSelect,
  ) {
    const data = await db
      .update(sessionSchema)
      .set({
        content,
      })
      .where(eq(sessionSchema.id, id));

    return data.rowsAffected === 1;
  },
};

export { sessionRepository };
