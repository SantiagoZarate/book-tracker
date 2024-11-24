import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function EmptyTracks() {
  const t = await getTranslations();

  return (
    <Link href={'/add'} className="group">
      <section className="m-2 flex items-center justify-center rounded-sm bg-secondary py-24 transition group-hover:-translate-y-1">
        <p>{t('home.no-tracks')}</p>
      </section>
    </Link>
  );
}
