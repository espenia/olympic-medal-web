'use client';

import { Card, Title, Text, Col, TextInput, DatePicker, Textarea, Grid, Flex, Button } from '@tremor/react';

// @ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom'
import { create } from './actions';
import { SubmitButton } from '@/src/submit-button/submitButton';
import { useState } from 'react';
import { redirect } from 'next/navigation';
import EventDto from '../../../../entities/events/event';
import { editEvent } from '../[slug]/edit/actions';

const initialState = {
  message : null
}

export default function CrearEvento({ event, redirectTo } : {event? : EventDto, redirectTo? : string }) {
  const [state, formAction] = useFormState(setClientValues, initialState);
  const [startDate, setStartDate] = useState(undefined as Date | undefined);
  const [endDate, setEndDate] = useState(undefined as Date | undefined);

  async function setClientValues(previousState : any, formData : FormData): Promise<{ message : string } | undefined> {
    formData.set("start_date", startDate?.toISOString() ?? '');
    formData.set("end_date", endDate?.toISOString() ?? '');
    const res = event ? await editEvent(previousState, formData) : await create(previousState, formData);
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
        <form onSubmit={formAction}>
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
                name="sport_type"
                id="sport_type"
                placeholder=''
                required
                value={event?.sportType}
              />
            </Col>
            <Col numColSpan={1} numColSpanMd={2}>
              <Text>Descripción:</Text>
              <Textarea
                id="description"
                name="description"
                placeholder=''
                required
                value={event?.description}
              />
            </Col>
            <Col>
              <Text>Pais:</Text>
              <TextInput
                type="text"
                name="country"
                id="country"
                placeholder=''
                value={event?.country}
                required
              />
            </Col>
            <Col>
              <Text>Estado:</Text>
              <TextInput
                type="text"
                name="state"
                id="state"
                placeholder=''
                value={event?.state}
                required
              />
            </Col>
            <Col>
              <Text>Fecha de inicio:</Text>
              <DatePicker
                id="start_date"
                maxDate={endDate ?? undefined}
                onValueChange={setStartDate}
                value={event?.startDate}
                aria-required={true}
                placeholder=''
              />
            </Col>
            <Col>
              <Text>Fecha de finalizacion:</Text>
              <DatePicker
                id="end_date"
                minDate={startDate ?? undefined}
                onValueChange={setEndDate}
                value={event?.endDate}
                aria-required={true}
                placeholder=''
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
