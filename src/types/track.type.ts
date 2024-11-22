import { trackSchema } from '@/db/schemas';
import { InferInsertModel } from 'drizzle-orm';

// DB TYPED OBJECT
export type TrackRAW = Required<InferInsertModel<typeof trackSchema>>;

export type TrackSelect = Pick<TrackRAW, 'id'>;
export type TrackDelete = Pick<TrackRAW, 'id'>;
export type TrackInsert = Pick<TrackRAW, 'bookId' | 'userId'>;
