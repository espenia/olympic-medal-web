import { Card, Grid, Title, Bold, Callout } from '@tremor/react';
import { getServerSession } from 'next-auth';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-top p-24">
      <Title className='pb-5 mb-5'>
        <Bold>
          Portal de Administradores
        </Bold>
      </Title>
      {
       session?.user ?
       <>
        <Callout
          className="pb-5 mb-5"
          title={"Hola, " + session?.user?.name + "!"}
          color="blue"
        >
          A continuacion se muestran algunas acciones para administrar eventos.
        </Callout>
       <Grid numItems={1} numItemsLg={2} className="grid text-center gap-3">
       <Card className='group rounded-lg border border-transparent transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-200/30'>
          <a href="/events/new" className="px-5 py-4">
            <h2 className={`mb-3 text-2xl font-semibold lg:text-left`}>
              Crear evento
            </h2>
            <p className={`m-0 text-sm opacity-50`}>
              Cree un evento para los deportistas.
            </p>
          </a>
        </Card>
       </Grid>
       </>
       :
        <>
        <Grid numItems={1} numItemsLg={2} className="grid text-center gap-3">
          <Card className='group rounded-lg border border-transparent transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-200/30'>
            <a href="/signup" className='px-5 py-4'>
              <h2 className={`mb-3 text-2xl font-semibold lg:text-left`}>
                Registrarse
              </h2>
              <p className={`m-0 text-sm opacity-50`}>
                Crear una cuenta para administrar eventos y resultados.
              </p>
            </a>
          </Card>
          <Card className='group rounded-lg border border-transparent transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-200/30'>
            <a href='/api/auth/signin' className='px-5 py-4'>
              <h2 className={`mb-3 text-2xl font-semibold lg:text-left`}>
                Iniciar sesion
              </h2>
              <p className={`m-0 text-sm opacity-50`}>
                Ingrese al portal con usuario y contrasenia.
              </p>
            </a>
          </Card>
        </Grid>
        </>
      }
    </main>
  )
}
