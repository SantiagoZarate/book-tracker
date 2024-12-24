import { BookDrawIcon } from '../../icons/BookDrawIcon';
import './discover-books.css';

export function DiscoverBooks() {
  return (
    <section className="flex h-full items-center gap-4">
      <span className="book-icon">
        <BookDrawIcon />
      </span>
      <ul className="discover-books-list grid h-full grid-cols-2 gap-1 [mask-image:radial-gradient(circle_at_0%_50%,black,transparent)]">
        {Array(6)
          .fill(1)
          .map((_, index) => (
            <li
              className="aspect-square h-full rounded-md border border-border bg-primary/5"
              key={index}
            ></li>
          ))}
      </ul>
    </section>
  );
}
