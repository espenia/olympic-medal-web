'use server'

import {Card, Title, Text, Col, TextInput, Textarea, Grid, Flex, Button, Italic} from '@tremor/react';

// @ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom'
import {formatValuesAndCreate} from './actions';
import { SubmitButton } from '@/src/submit-button/submitButton';
import React from 'react';
import EventDto from '../../../../entities/events/event';



export default async function CrearEvento({ event } : {event? : EventDto }) {

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card>
        <Flex justifyContent="between" className="pb-8">
          <Flex flexDirection='col' alignItems='start' className='ps-4'>
            <Title>{!event ? "Crear evento" : "Editar evento"}</Title>
            <Text>{!event ? "Completa el detalle del evento" : "Edite el evento a continuacion."}</Text>
          </Flex>
          <Flex justifyContent="end" className="pe-4">
            <a href={event ? `/events/${event.id}` : `/events`}>
              <Button variant="secondary">{event ? "Volver al evento" : "Volver a la lista"}</Button>
            </a>
          </Flex>
        </Flex>
        <form
            action={formatValuesAndCreate}
        >
          <Grid numItems={1} numItemsMd={2} className="gap-3 p-4">
            <Col>
              <Text>Nombre del evento:</Text>
              <TextInput
                name="name"
                id="name"
                placeholder=''
                required
                value={event?.name}
              />
            </Col>
            <Col>
              <Text>Tipo de deporte:</Text>
              <TextInput
                name="category"
                id="category"
                placeholder=''
                value={event?.category}
              />
            </Col>
            <Col>
              <Text>Pais:</Text>
              <TextInput
                type="text"
                name="location"
                id="location"
                placeholder=''
                value={event?.location}
              />
            </Col>
            <Col>
              <Text>Distancia:</Text>
              <TextInput
                  type="number"
                  name="distance"
                  id="distance"
                  placeholder=''
                  value={event?.distance?.toString()}
              />
            </Col>
            <Col>
              <Text>Fecha:</Text>
              <input type="date"
                  name="date"
                  id="date"
                     required
                  placeholder=''
              />
            </Col>
            <Col>
              <Text>Cantidad de Participantes:</Text>
              <TextInput
                  type="number"
                  name="participantsCount"
                  id="participantsCount"
                  placeholder=''
                  value={event?.participantsCount?.toString()}
              />
            </Col>
            <Col>
              <Text>Sitio oficial:</Text>
              <TextInput
                  type="text"
                  name="officialSite"
                  id="officialSite"
                  placeholder=''
                  value={event?.officialSite}
              />
            </Col>
            <Col>
              <Text>Edicion:</Text>
              <TextInput
                  type="number"
                  name="edition"
                  id="edition"
                  placeholder=''
                  value={event?.edition?.toString()}
              />
            </Col>
            <Col numColSpan={1} numColSpanMd={2}>
              <Text>Descripción:</Text>
              <Textarea
                  id="description"
                  name="description"
                  placeholder=''
                  value={event?.description}
              />
            </Col>
            <Col>
              <Text>Resultados: </Text>
              <input name="csv" type="file" /><br></br>
              <Italic>Extensiones soportadas: .csv</Italic>
            </Col>
          </Grid>
          <Col>
            <Flex justifyContent="end" className="pe-4">
              <SubmitButton />
            </Flex>
          </Col>
        </form>
      </Card>
    </main>
  );
};
