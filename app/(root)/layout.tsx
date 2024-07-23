import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '@/app/globals.css';

import TopBar from '@/components/shared/TopBar';
import Footer from '@/components/shared/Footer';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'RexRide',
  description: 'Find affordable rides to your destination',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex h-screen flex-col">
      <TopBar />
      <Toaster richColors />
      <main className="flex-1">{children}</main>

      <Footer />
    </section>
  );
}
