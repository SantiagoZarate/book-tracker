import Link from "next/link";
import { Suspense } from "react";
import { BooksList } from "./BooksList";
import { Loader } from "./Loader";
import { Search } from "./Search";

interface Props {
  searchParams: {
    search?: string | null;
  };
}

export default async function Page({ searchParams }: Props) {
  const query = searchParams.search ?? "";

  return (
    <section className="flex flex-col gap-4 pt-4">
      <Search />
      <p className="text-xs text-center">
        The book you&apos;re looking for is not here?{" "}
        <Link href="/create" className="font-bold hover:underline">
          add it yourself!
        </Link>
      </p>
      <Suspense fallback={<Loader />}>
        <BooksList query={query} />
      </Suspense>
    </section>
  );
}
