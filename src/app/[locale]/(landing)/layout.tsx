import { Footer } from '@/app/components/common/footer/Footer';
import { Header } from '@/app/components/common/header/Header';
import { PropsWithChildren } from 'react';

export default function LandingLayout({ children }: PropsWithChildren) {
  return (
    <section className="relative grid min-h-dvh grid-rows-[1fr_auto]">
      <Header />
      <section>{children}</section>
      <Footer />
    </section>
  );
}
