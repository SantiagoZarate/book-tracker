import { BookGenresDTO } from '@/shared/dtos/bookDTO';
import { BookRAW } from '@/types/book.type';

export interface BookService {
  getAll: (props: GetAllParams) => Promise<BookGenresDTO[]>;
  bookExists: (title: BookRAW['title']) => Promise<boolean>;
}

interface GetAllParams {
  query?: string | null;
}
