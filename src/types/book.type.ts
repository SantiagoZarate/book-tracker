import { bookSchema } from '@/db/schemas';
import { InferInsertModel } from 'drizzle-orm';

export type BookRAW = Required<InferInsertModel<typeof bookSchema>>;

export type BookSelect = Pick<BookRAW, 'id'>;
export type BookDelete = Pick<BookRAW, 'id'>;
export type BookInsert = Pick<
  BookRAW,
  'author' | 'title' | 'totalPages' | 'cover'
> & {
  genres: string[];
};

export interface Book {
  title: string;
  author: string;
  pages: number;
}
