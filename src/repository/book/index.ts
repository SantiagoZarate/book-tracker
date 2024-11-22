import { BookDTO, BookGenresDTO } from '@/shared/dtos/bookDTO';
import { BookRAW, BookSelect } from '@/types/book.type';

export interface IBookRepository {
  getAll: (config: FilteredOptions) => Promise<BookGenresDTO[]>;
  getOne: (id: BookSelect) => Promise<BookGenresDTO>;
  getByTitle: (title: BookRAW['title']) => Promise<BookDTO>;
}

interface FilteredOptions {
  query?: string | null;
}
