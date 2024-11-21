import { ProviderButton } from '@/app/components/ui/button';
import type { Metadata } from 'next';
import '../../styles/index.css';

export const metadata: Metadata = {
  title: 'Book Tracker | Sign in',
  description: 'Generated by create next app',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="mx-auto grid min-h-dvh max-w-screen-sm content-center">
      <section className="mx-auto flex w-full max-w-[320px] flex-col gap-8">
        {children}
        <section className="flex items-center gap-1 [&_div]:rounded-full">
          <div className="h-1 w-full bg-border" />
          <p className="text-sm">or</p>
          <div className="h-1 w-full bg-border" />
        </section>
        <footer className="flex flex-col gap-2">
          <ProviderButton provider={'github'} img="/images/github-logo.png" />
          <ProviderButton
            provider={'google'}
            img="/images/google-logo.png"
            disabled
          />
        </footer>
      </section>
    </section>
  );
}
