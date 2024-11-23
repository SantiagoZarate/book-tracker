import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { SignInForm } from './SignInForm';

export default async function Page() {
  const t = await getTranslations();

  return (
    <section className="flex flex-col gap-4">
      <SignInForm />
      <footer className="flex justify-center">
        <Link href="/signup">{t('signin.text')}</Link>
      </footer>
    </section>
  );
}
