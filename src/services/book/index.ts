import { Book } from "@/types/book.type";

export interface BookService {
  getAll: (props: GetAllParams) => Promise<Book[]>;
}

interface GetAllParams {
  query?: string | null;
}
