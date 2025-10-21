import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Taman Sardi - Destinasi Wisata Alam Gunung Muria',
  description:
    'Nikmati pengalaman outbond, villa, dan hall berlatar pemandangan alam khas Gunung Muria di Taman Sardi, Kudus.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-desert/40 text-night">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
