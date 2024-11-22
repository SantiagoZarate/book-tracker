import { bookRepository } from '@/repository/book/book.repository';
import { BookService } from '.';
import { genreRepository } from '../genre/genre.repository';

export const booksService: BookService = {
  async getAll({ query = '' }) {
    const books = await bookRepository.getAll({ query });
    return books;
  },
  async create(payload) {
    const bookExists = await bookRepository.bookExists(payload.title);

    if (bookExists) {
      throw new Error('This book already exists');
    }

    const result = await bookRepository.create(payload);
    return result;
  },
  async getGenres() {
    const genres = await genreRepository.getAll();
    return genres;
  },
};
