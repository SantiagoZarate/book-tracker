import { db } from "@/db/db";
import { sessionSchema } from "@/db/schemas";
import { TrackSelect } from "@/types/track.type";
import { eq, sql } from "drizzle-orm";

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
};

export { sessionRepository };
