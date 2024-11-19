import { BookGenresDTO } from "@/shared/dtos/bookDTO";

export interface BookService {
  getAll: (props: GetAllParams) => Promise<BookGenresDTO[]>;
}

interface GetAllParams {
  query?: string | null;
}
