import { Card, Title, Text, Button } from '@tremor/react';
import { UUID } from 'crypto';
import getEvent from './actions';


export default async function Event({ params }: { params: { slug: UUID }}) {
  const event = await getEvent(params.slug);

  const open = event?.endDate && event?.endDate < new Date();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title className="text-3xl font-bold">{event?.name}</Title>
      <Text className="text-lg">{event?.description}</Text>
      <Text className="text-lg">Tipo de deporte: {event?.sportType}</Text>
      <Text className="text-lg">Localización: {event?.country}</Text>
      <Text className="text-lg">Localización: {event?.state}</Text>
      <Text className={`text-lg ${open ? 'text-green-500' : 'text-red-500'}`}>Estado: {open ? "Abierto" : "Cerrado"}</Text>
      <Card className="mt-6">
      <a href={`/events/${params.slug}/edit`}>
        <Button className="bg-blue-500 text-white mt-4">Editar informacion</Button>
      </a>
      <a href={`/events/${params.slug}/results`}>
        <Button className="bg-blue-500 text-white mt-4">Resultados</Button>
      </a>
      </Card>
    </main>
  );
}

