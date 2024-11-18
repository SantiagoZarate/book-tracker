import { Book, BOOKS } from "@/app/data/books";

const booksService = {
  async getBooks({ query }: { query?: string | null }): Promise<Book[]> {
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

interface Props {
  query?: string | null;
}

export async function BooksList({ query }: Props) {
  const books = await booksService.getBooks({ query });

  return (
    <ul className="flex flex-col divide-y">
      {books.map((b) => (
        <li key={b.title}>
          <p>{b.title}</p>
        </li>
      ))}
    </ul>
  );
}
