import { relations } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { trackSchema } from './track.schema';

export const userSchema = sqliteTable('user', {
  id: text('id')
    .primaryKey()
    .notNull()
    .$defaultFn(() => nanoid()),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
});

export const userRelations = relations(userSchema, ({ many }) => ({
  tracks: many(trackSchema),
}));
