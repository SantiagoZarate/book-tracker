import { userSchema } from '@/db/schemas';
import { InferInsertModel } from 'drizzle-orm';

export type UserRAW = Required<InferInsertModel<typeof userSchema>>;

export type UserSelect = Pick<UserRAW, 'id'>;
export type UserDelete = Pick<UserRAW, 'id'>;
export type UserInsert = Pick<UserRAW, 'password' | 'username'>;
