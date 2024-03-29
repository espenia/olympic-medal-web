import { Title, Bold, Callout, Grid, Card } from '@tremor/react';
import { getServerSession } from 'next-auth';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-top p-24">
      <Title className='pb-5 mb-5'>
        <Bold>
          Portal de Deportistas
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
          Busque eventos o valide sus clasificaciones.
        </Callout>
       <Grid numItems={1} numItemsLg={2} className="grid text-center gap-3">
       <Card className='group rounded-lg border border-transparent transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-200/30'>
          <a href="/events" className="px-5 py-4">
            <h2 className={`mb-3 text-2xl font-semibold lg:text-left`}>
              Buscar eventos
            </h2>
            <p className={`m-0 text-sm opacity-50`}>
              Vea todos los eventos o busque aquellos que le interesen.
            </p>
          </a>
        </Card>
        <Card className='group rounded-lg border border-transparent transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-200/30'>
          <a href="/validate" className="px-5 py-4">
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Validar resultados
            </h2>
            <p className={`m-0 text-sm opacity-50`}>
              Administre sus resultados en eventos que haya participado.
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
                Crear una cuenta para buscar eventos y ver sus resultados.
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
