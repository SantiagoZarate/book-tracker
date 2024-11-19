import { sessionSchema } from "@/db/schemas";
import { InferInsertModel } from "drizzle-orm";

export type SessionRAW = Required<InferInsertModel<typeof sessionSchema>>;

export type SessionSelect = Pick<SessionRAW, "id">;
export type SessionDelete = Pick<SessionRAW, "id">;
export type SessionInsert = Pick<
  SessionRAW,
  "content" | "pagesRead" | "trackId"
>;
