import { BookIcon } from '../../icons/BookIcon';
import { Navbar } from './Navbar';
import { SidebarFooter } from './SidebarFooter';

export function Sidebar() {
  return (
    <aside className="relative border-r bg-secondary">
      <section className="sticky top-0 flex h-full max-h-dvh flex-col justify-between">
        <section className="flex flex-col items-center">
          <header className="flex items-center gap-2 px-2 py-4">
            <BookIcon />
            <section className="hidden flex-col sm:flex">
              <p>Book Tracker</p>
              <p className="text-xs">v1.0.0</p>
            </section>
          </header>
          <Navbar />
        </section>
        <SidebarFooter />
      </section>
    </aside>
  );
}
