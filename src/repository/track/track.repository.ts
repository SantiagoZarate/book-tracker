import { db } from "@/db/db";
import { trackSchema } from "@/db/schemas";
import { trackBookSchemaDTO } from "@/shared/dtos/trackDTO";
import { eq } from "drizzle-orm";
import { TrackRepository } from ".";

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
      },
    });
    return trackBookSchemaDTO.parse(data);
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
};

export { trackRepository };
