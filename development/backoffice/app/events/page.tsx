import { Card, Title, Text, Accordion, AccordionBody, AccordionHeader, Col, Grid, TextInput } from '@tremor/react';
import EventsTable from '@/src/tables/events-table/eventsTable';
import {getEvents, filter} from './actions';
import { SubmitButton } from '@/src/submit-button/submitButton';

export default async function Events({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const params = {
    name: searchParams?.name,
    category: searchParams?.category,
    location: searchParams?.location,
    date_from: searchParams?.date_from,
    date_to: searchParams?.date_to,
    edition: searchParams?.edition,
    athlete_first_name: searchParams?.athlete_first_name,
    athlete_last_name: searchParams?.athlete_last_name,
    athlete_country: searchParams?.athlete_country,
  }

  const events = await getEvents(params.name, 
                                 params.category, 
                                 params.location, 
                                 params.edition, 
                                 params.date_from, 
                                 params.date_to, 
                                 params.athlete_first_name, 
                                 params.athlete_last_name, 
                                 params.athlete_country);

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Eventos</Title>
      <Text>
        Conozca el detalle de los eventos disponibles a continuacion
      </Text>
      <Accordion className='mt-4'>
        <AccordionHeader>Filtros</AccordionHeader>
        <AccordionBody>
          <form action={filter}>
            <Grid numItemsMd={2} numItems={1} className='p-4 gap-3'>
              <Col>
                <Text>Nombre</Text>
                <TextInput name="name" placeholder={params.name ?? ""}></TextInput>
              </Col>
              <Col>
                <Text>Categoria</Text>
                <TextInput name="category" placeholder={params.category ?? ""}></TextInput>
              </Col>
              <Col>
                <Text>Ubicacion</Text>
                <TextInput name="location" placeholder={params.location ?? ""}></TextInput>
              </Col>
              <Col>
                <Text>Edicion</Text>
                <TextInput name="edition" placeholder={params.edition ?? ""}></TextInput>
              </Col>
              <Col>
                <Text>Fecha desde</Text>
                <input type='date' name="date_from" placeholder={params.date_from ?? ""}></input>
              </Col>
              <Col>
                <Text>Fecha hasta</Text>
                <input type='date' name="date_to" placeholder={params.date_to ?? ""}></input>
              </Col>
              <Col>
                <Text>Nombre atleta</Text>
                <TextInput name="athlete_first_name" placeholder={params.athlete_first_name ?? ""}></TextInput>
              </Col>
              <Col>
                <Text>Apellido atleta</Text>
                <TextInput name="athlete_last_name" placeholder={params.athlete_last_name ?? ""}></TextInput>
              </Col>
              <Col>
                <Text>Pais atleta</Text>
                <TextInput name="athlete_country" placeholder={params.athlete_country ?? ""}></TextInput>
              </Col>
            </Grid>
            <Col className='ms-3'>
              <SubmitButton></SubmitButton>
            </Col>
          </form>
        </AccordionBody>
      </Accordion>
      <Card className="mt-6">
        <EventsTable events={events} />
      </Card>
    </main>
    );
}