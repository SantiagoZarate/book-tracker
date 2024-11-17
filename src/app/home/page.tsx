import { BOOK_TRACKS } from "../data/book-tracks";
import { BookTrackItem } from "./BookTrackItem";

export default function page() {
  return (
    <section className="mx-auto max-w-screen-xl pt-20 flex flex-col gap-12">
      <header>
        <p className="text-7xl">Home page</p>
      </header>
      <section className="flex flex-col gap-4">
        <p>Recent books tracks</p>
        <ul className="flex flex-col gap-4">
          {BOOK_TRACKS.map((book, idx) => (
            <BookTrackItem key={idx} book={book} />
          ))}
        </ul>
      </section>
    </section>
  );
}
