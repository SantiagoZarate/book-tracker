import Link from 'next/link';

export function Header() {
  return (
    <header className="fixed top-0 w-full border-b border-border px-4">
      <section className="mx-auto flex max-w-screen-xl items-center justify-between">
        <section>
          <h2>Book tracker</h2>
        </section>
        <nav>
          <Link href={'/signin'}>Start</Link>
        </nav>
      </section>
    </header>
  );
}
