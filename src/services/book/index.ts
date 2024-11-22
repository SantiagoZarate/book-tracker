import { BookGenresDTO } from '@/shared/dtos/bookDTO';
import { BookInsert, BookSelect } from '@/types/book.type';

export interface BookService {
  getAll: (props: GetAllParams) => Promise<BookGenresDTO[]>;
  create: (payload: BookInsert) => Promise<BookSelect>;
}

interface GetAllParams {
  query?: string | null;
}
