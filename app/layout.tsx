import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

import ConvexClientProvider from '@/providers/ConvexClientProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

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
    <html lang="en">
      <body className={poppins.variable}>
        <ConvexClientProvider>
          <Toaster richColors />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
