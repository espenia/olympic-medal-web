'use client';

import { Card, Title, Text, Button } from '@tremor/react';
import EventDto from "../../../../entities/events/event";


export default function Event({ params }: { params: { slug: number }}) {

  const eventoDeportivo = new EventDto(
    params.slug,
    "Evento Deportivo",
    "Descripción del evento deportivo",
    "Maraton 10k",
    "Argentina",
    "Buenos Aires",
    new Date(2023, 0, 1),
    new Date(2023, 11, 30)
  );

  const open = eventoDeportivo.endDate && eventoDeportivo.endDate < new Date();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title className="text-3xl font-bold">{eventoDeportivo.name}</Title>
      <Text className="text-lg">{eventoDeportivo.description}</Text>
      <Text className="text-lg">Tipo de deporte: {eventoDeportivo.sportType}</Text>
      <Text className="text-lg">Localización: {eventoDeportivo.country}</Text>
      <Text className="text-lg">Localización: {eventoDeportivo.state}</Text>
      <Text className={`text-lg ${open ? 'text-green-500' : 'text-red-500'}`}>Estado: {open ? "Abierto" : "Cerrado"}</Text>
      <Card className="mt-6">
      <a href="/form">
            <Button className="bg-blue-500 text-white mt-4">Cargar resultados</Button>
          </a>
      </Card>
    </main>
  );
}

