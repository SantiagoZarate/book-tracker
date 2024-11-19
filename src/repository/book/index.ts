import { BookGenresDTO } from "@/shared/dtos/bookDTO";
import { BookSelect } from "@/types/book.type";

export interface IBookRepository {
  getAll: (config: FilteredOptions) => Promise<BookGenresDTO[]>;
  getOne: (id: BookSelect) => Promise<BookGenresDTO>;
}

interface FilteredOptions {
  query?: string | null;
}
