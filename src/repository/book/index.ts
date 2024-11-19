import { BookGenresDTO } from "@/shared/dtos/bookDTO";
import { BookSelect } from "@/types/book.type";

export interface IBookRepository {
  getAll: () => Promise<BookGenresDTO[]>;
  getOne: (id: BookSelect) => Promise<BookGenresDTO>;
}
