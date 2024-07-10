import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '@/app/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import TopBar from '@/components/shared/TopBar';
import Footer from '@/components/shared/Footer';

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
      <main className="flex-1">{children}</main>
      <Footer />
    </section>
  );
}
