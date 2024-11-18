import { booksService } from "@/services/book/book.service";
import { addBookAction } from "./action";

interface Props {
  query?: string | null;
}

export async function BooksList({ query }: Props) {
  const books = await booksService.getAll({ query });

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
