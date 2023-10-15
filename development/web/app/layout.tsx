import './globals.css';

// import { Analytics } from '@vercel/analytics/react';
import Nav from '../src/navbar/nav';
// import Toast from './toast';
import { Suspense } from 'react';
import NavbarItem from '@/src/navbar/navbar-item';

export const metadata = {
  title: 'Next.js 13 + PlanetScale + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, PlanetScale, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const navbar : NavbarItem[] = [
    {
      name: "Inicio", href: "/"
    } as NavbarItem,
    {
      name: "Eventos", href: "/events"
    } as NavbarItem
  ]
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense>
          <Nav navigation={navbar} />
        </Suspense>
        {children}
        {/* <Analytics /> */}
        {/* <Toast /> */}
      </body>
    </html>
  );
}
