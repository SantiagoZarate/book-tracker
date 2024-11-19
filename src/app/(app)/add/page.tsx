import { BooksList } from "./BooksList";
import { Search } from "./Search";

interface Props {
  searchParams: {
    search?: string | null;
  };
}

export default async function Page({ searchParams }: Props) {
  const query = searchParams.search ?? "";

  return (
    <section className="flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <header>
          <p>Books List</p>
        </header>
      </section>
      <Search />
      <BooksList query={query} />
    </section>
  );
}
