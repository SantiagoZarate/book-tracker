import { SessionRAW } from "@/types/session.type";
import { z } from "zod";

export const sessionSchemaDTO = z.object({
  id: z.string(),
  content: z.string(),
  pagesRead: z.coerce.number(),
  createdAt: z.string(),
  trackId: z.string(),
}) satisfies z.ZodType<Omit<SessionRAW, "trackId">>;

export type SessionDTO = z.infer<typeof sessionSchemaDTO>;
