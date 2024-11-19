import { booksService } from "@/services/book/book.service";
import { addBookAction } from "./action";

interface Props {
  query?: string | null;
}

export async function BooksList({ query }: Props) {
  const books = await booksService.getAll({ query });

  return (
    <ul className="flex flex-col divide-y">
      {books.map((book) => (
        <li key={book.title} className="">
          <form
            className="flex justify-between items-center px-2 py-1"
            action={addBookAction}
          >
            <section className="flex justify-between items-center w-full">
              <section className="flex flex-col">
                <p>{book.title}</p>
                <ul className="flex gap-2">
                  {book.genres.map((genre) => (
                    <li
                      className="text-xs rounded-xl bg-card border border-border px-2 py-1"
                      key={genre.name}
                    >
                      <p>{genre.name}</p>
                    </li>
                  ))}
                </ul>
                <input hidden name="title" defaultValue={book.title} />
              </section>
              <button className="bg-accent">Add</button>
            </section>
          </form>
        </li>
      ))}
    </ul>
  );
}
