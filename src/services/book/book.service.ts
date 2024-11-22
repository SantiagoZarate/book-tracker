import { bookRepository } from '@/repository/book/book.repository';
import { BookService } from '.';

export const booksService: BookService = {
  async getAll({ query = '' }) {
    const books = await bookRepository.getAll({ query });
    return books;
  },
  async bookExists(title) {
    const book = await bookRepository.getByTitle(title);
    return book !== undefined;
  },
};
