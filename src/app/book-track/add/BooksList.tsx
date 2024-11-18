import { Book, BOOKS } from "@/app/data/books";
import { addBookAction } from "./action";

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
        <li key={b.title} className="">
          <form
            className="flex justify-between items-center px-2 py-1"
            action={addBookAction}
          >
            <section>
              <p>{b.title}</p>
              <input hidden name="title" defaultValue={b.title} />
            </section>
            <button className="bg-accent">Add</button>
          </form>
        </li>
      ))}
    </ul>
  );
}
