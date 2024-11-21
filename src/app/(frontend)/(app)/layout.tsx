import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Sidebar } from '../../components/common/sidebar/Sidebar';
import { Toaster } from '../../components/ui/sonner';
import { SessionWrapper } from '../../provider/sessionWrapper';
import '../../styles/index.css';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <section className="mx-auto grid min-h-dvh max-w-screen-sm grid-cols-[auto_1fr]">
            <Sidebar />
            <main className="">{children}</main>
          </section>
          <Toaster />
        </body>
      </SessionWrapper>
    </html>
  );
}
