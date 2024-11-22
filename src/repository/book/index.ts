import { BookGenresDTO } from '@/shared/dtos/bookDTO';
import { BookInsert, BookRAW, BookSelect } from '@/types/book.type';

export interface IBookRepository {
  getAll: (config: FilteredOptions) => Promise<BookGenresDTO[]>;
  getOne: (id: BookSelect) => Promise<BookGenresDTO>;
  bookExists: (title: BookRAW['title']) => Promise<boolean>;
  create: (payload: BookInsert) => Promise<BookSelect>;
}

interface FilteredOptions {
  query?: string | null;
}
