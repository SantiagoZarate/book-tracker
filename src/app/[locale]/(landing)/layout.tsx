import { Footer } from '@/app/components/common/footer/Footer';
import { Header } from '@/app/components/common/header/Header';
import { PropsWithChildren } from 'react';
import './layout.css';

export default function LandingLayout({ children }: PropsWithChildren) {
  return (
    <section className="landing-layout relative grid min-h-dvh grid-rows-[1fr_auto] pt-10">
      <Header />
      <section>{children}</section>
      <Footer />
    </section>
  );
}
