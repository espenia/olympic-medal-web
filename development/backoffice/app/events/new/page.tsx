'use client';

import {Card, Title, Text, Col, TextInput, DatePicker, Textarea, Grid, Flex, Button, NumberInput} from '@tremor/react';

// @ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom'
import { create } from './actions';
import { SubmitButton } from '@/src/submit-button/submitButton';
import React, { useState } from 'react';
import { redirect } from 'next/navigation';
import EventDto from '../../../../entities/events/event';
import { editEvent } from '../[slug]/edit/actions';

const initialState = {
  message : null
}

export default function CrearEvento({ event, redirectTo } : {event? : EventDto, redirectTo? : string }) {
  const [state, formAction] = useFormState(setClientValues, initialState);
  const [date, setDate] = useState(undefined as Date | undefined);

  async function setClientValues(previousState : any, formData : FormData): Promise<{ message : string } | undefined> {
    formData.set("date", date?.toISOString() ?? '');
    const file : File = formData.get('csv') as File;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {

        const csvData = event.target.result as string;
        formData.set("csv", csvData);
      }
    }
    reader.readAsText(file);
    const res = event ? await editEvent(previousState, formData) : await create(previousState, formData);
    const n = 1/0;
    console.log(n);
    if (!res) {
      redirect(redirectTo ? redirectTo : "/events");
    }
    return res;
  }

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
            action={formAction}
        >
          <Col><input name="csv" type="file" /></Col>
          <Grid numItems={1} numItemsMd={2} className="gap-2 p-4">
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
              <NumberInput
                  type="number"
                  name="distance"
                  id="distance"
                  placeholder=''
                  value={event?.distance}
              />
            </Col>
            <Col>
              <Text>Fecha:</Text>
              <DatePicker
                  id="date"
                  minDate={date ?? undefined}
                  onValueChange={setDate}
                  value={event?.date}
                  aria-required={true}
                  placeholder=''
              />
            </Col>
            <Col>
              <Text>Cantidad de Participantes:</Text>
              <NumberInput
                  type="number"
                  name="participantCount"
                  id="participantCount"
                  placeholder=''
                  value={event?.participant_count}
              />
            </Col>
            <Col>
              <Text>Sitio oficial:</Text>
              <TextInput
                  type="text"
                  name="officialSite"
                  id="officialSite"
                  placeholder=''
                  value={event?.official_site}
              />
            </Col>
            <Col>
              <Text>Edicion:</Text>
              <NumberInput
                  type="number"
                  name="edition"
                  id="edition"
                  placeholder=''
                  value={event?.edition}
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
          </Grid>
          <Col>
            <Flex justifyContent="end" className="pe-4">
              <SubmitButton />
            </Flex>
          </Col>
          <Text aria-live="polite" className="sr-only" role="status">
            {state?.message}
          </Text>
        </form>
      </Card>
    </main>
  );
};
