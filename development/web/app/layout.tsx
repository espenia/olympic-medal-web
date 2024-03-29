import './globals.css';

import Nav from '../src/navbar/nav';
import { Suspense } from 'react';
import NavbarItem from '@/src/navbar/navbar-item';
import { getServerSession } from 'next-auth';

export const metadata = {
  title: 'Portal de deportistas - Medallero',
  description:
    'Participe y administre sus resultados en eventos deportivos.'
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
      name: "Atletas", href: "/athletes"
    } as NavbarItem,
    {
      name: "Validar Clasificaciones", href: "/validate"
    } as NavbarItem,
    {
      name: "Mi Perfil", href: "/profile"
    } as NavbarItem,
  ] : [
    {
      name: "Inicio", href: "/"
    } as NavbarItem,
    {
      name: "Registro", href: "/signup"
    } as NavbarItem,
    {
      name: "Iniciar sesion", href: "/api/auth/signin"
    } as NavbarItem,
  ]
  return (
    <html lang="en" className="h-full bg-gray-50">
        <body className="h-full">
          <Suspense>
            <Nav navigation={navbar} session={session} />
          </Suspense>
          {children}
          {/* <Analytics /> */}
          {/* <Toast /> */}
        </body>
      </html>
  );
}
