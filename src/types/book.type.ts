import { bookSchema } from '@/db/schemas';
import { InferInsertModel } from 'drizzle-orm';

type BookRAW = Required<InferInsertModel<typeof bookSchema>>;

export type BookSelect = Pick<BookRAW, 'id'>;
export type BookDelete = Pick<BookRAW, 'id'>;
export type BookInsert = Pick<BookRAW, 'author' | 'title' | 'totalPages'>;

export interface Book {
  title: string;
  author: string;
  pages: number;
}
