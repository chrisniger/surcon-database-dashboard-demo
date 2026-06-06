import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SURCON DBMS — Surveyors Council of Nigeria',
  description: 'Frontend demo of the SURCON database management and examination reporting system.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
