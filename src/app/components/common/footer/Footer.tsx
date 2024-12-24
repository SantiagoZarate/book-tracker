export function Footer() {
  return (
    <footer className="mx-auto w-full">
      <section className="mx-auto flex max-w-screen-lg flex-col gap-2 border-t border-border pb-12 pt-4">
        <p className="text-sm">
          Created by{' '}
          <a href="https://santiago-zarate.netlify.app/" target="_blank">
            Santiago Zarate
          </a>{' '}
        </p>
        <a
          href="https://github.com/SantiagoZarate/book-tracker/tree/main"
          target="_blank"
          className="w-fit"
        >
          <p className="text-xs text-primary/50 hover:text-primary hover:underline">
            Source code
          </p>
        </a>
      </section>
    </footer>
  );
}
