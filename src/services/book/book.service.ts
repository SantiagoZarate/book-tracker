import { bookRepository } from "@/repository/book/book.repository";
import { BookService } from ".";

export const booksService: BookService = {
  async getAll({ query = "" }) {
    const books = await bookRepository.getAll({ query });
    return books;
  },
};
