'use client';

import { Card, Title, Text, Button, Flex } from '@tremor/react';
import { Search } from '../../src/search-bar/search'
import EventsTable from '@/src/tables/events-table/eventsTable';
import getEvents from './actions';
import { useEffect, useState } from 'react';
import EventDto from '../../../entities/events/event';

export default function Events() {
  const [events, setEvents] = useState<EventDto[]>([]);
  const fetchEvents = (text?: string) => {
    getEvents(text)
      .then((data) => {
        setEvents(data)
      })
  }
  
    useEffect(fetchEvents, []);

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Eventos</Title>
      <Text>
        Conozca el detalle de los eventos disponibles a continuacion
      </Text>
      <Search onTextChanged={fetchEvents} />
      <Card className="mt-6">
        <Flex justifyContent='end'>
          <a href='/events/new'>
            <Button>Nuevo</Button>
          </a>
        </Flex>
        <EventsTable events={events} />
      </Card>
    </main>
    );
}