import { BookIcon } from "../../icons/BookIcon";
import { Navbar } from "./Navbar";

export function Sidebar() {
  return (
    <aside className="flex border-r flex-col items-center">
      <header className="flex items-center gap-2 py-4 px-2">
        <BookIcon />
        <section className="hidden  sm:flex flex-col">
          <p>Book Tracker</p>
          <p className="text-xs">v1.0.0</p>
        </section>
      </header>
      <Navbar />
    </aside>
  );
}
