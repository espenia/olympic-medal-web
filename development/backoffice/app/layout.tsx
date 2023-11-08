import './globals.css';

// import { Analytics } from '@vercel/analytics/react';
import Nav from '../src/navbar/nav';
// import Toast from './toast';
import { Suspense } from 'react';
import NavbarItem from '@/src/navbar/navbar-item';
import { getServerSession } from 'next-auth';
import 'reflect-metadata';

export const metadata = {
  title: 'Portal de administradores - Medallero',
  description:
    'Administre eventos, cargue, apruebe o rechace resultados de los deportistas en los distintos eventos.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const navbar : NavbarItem[] = session?.user ? [
    {
      name: "Inicio", href: "/"
    } as NavbarItem,
    {
      name: "Eventos", href: "/events"
    } as NavbarItem,
    {
      name: "Usuarios", href: "/user"
    } as NavbarItem,
    {
      name: "Crear Evento", href: "/events/new"
    } as NavbarItem,
    {
      name: "Validar Clasificacion", href: "/validate"
    } as NavbarItem
  ] : [
    {
      name: "Inicio", href: "/"
    } as NavbarItem,
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
