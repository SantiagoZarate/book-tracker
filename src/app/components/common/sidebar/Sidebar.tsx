import { BookIcon } from '../../icons/BookIcon';
import { Navbar } from './Navbar';

export function Sidebar() {
  return (
    <aside className="relative border-r">
      <section className="sticky top-0 flex flex-col items-center">
        <header className="flex items-center gap-2 px-2 py-4">
          <BookIcon />
          <section className="hidden flex-col sm:flex">
            <p>Book Tracker</p>
            <p className="text-xs">v1.0.0</p>
          </section>
        </header>
        <Navbar />
      </section>
    </aside>
  );
}
