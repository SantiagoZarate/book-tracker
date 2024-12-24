import Image from 'next/image';
import { HeaderNav } from './header-nav';

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border px-4 backdrop-blur-md">
      <section className="mx-auto flex max-w-screen-lg items-center justify-between py-2">
        <section className="flex gap-4">
          <div className="relative size-6">
            <Image src="/svg/book-tracker.svg" alt="book tracker logo" fill />
          </div>
          <h2 className="font-semibold">Book tracker</h2>
        </section>
        <HeaderNav />
      </section>
    </header>
  );
}
