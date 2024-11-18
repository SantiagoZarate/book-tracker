import { BOOKS } from "@/app/(app)/data/books";
import { BookService } from ".";

export const booksService: BookService = {
  async getAll({ query }) {
    return await new Promise((resolve) => {
      setTimeout(() => {
        if (!query) {
          resolve(BOOKS);
          return;
        }

        const filteredBooks = BOOKS.filter(
          (b) => b.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );

        resolve(filteredBooks);
      }, 500);
    });
  },
};
