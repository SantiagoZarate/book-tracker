import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Suspense } from 'react';
import { BooksList } from './BooksList';
import { Loader } from './Loader';
import { Search } from './Search';

interface Props {
  searchParams: {
    search?: string | null;
  };
}

export default async function Page({ searchParams }: Props) {
  const query = searchParams.search ?? '';
  const t = await getTranslations();

  return (
    <section className="flex flex-col gap-4 pt-4">
      <Search />
      <p className="text-center text-xs">
        {t('add.title')}
        <Link href="/create/step-one" className="font-bold hover:underline">
          {t('add.description')}
        </Link>
      </p>
      <Suspense fallback={<Loader />}>
        <BooksList query={query} />
      </Suspense>
    </section>
  );
}
