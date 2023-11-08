'use client';

import { Card, Title, Text, Button, Select, Col, TextInput, DatePicker } from '@tremor/react';

// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

// @ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom'
import { create } from './actions';
import EventDto from '../../../../entities/events/event';

const initialState = new EventDto();

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" aria-disabled={pending}>
      Crear
    </Button>
  )
}

export default function CrearEvento() {
  const [state, formAction] = useFormState(create, initialState)

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card>
        <Title>Crear Evento</Title>
        <form onSubmit={formAction}>
          <Col className='col-6'>
            <Text>Completa los detalles del evento:</Text>
          </Col>
          <Col className='col-6'>
            <Text>Nombre del evento:</Text>
            <TextInput
              name="name"
              id="name"
              className="border p-2 w-full"
              placeholder='Ingrese el nombre del evento'
              required
            />
          </Col>
          <Col className='col-6'>
            <Text>Descripción:</Text>
            <textarea
              id="description"
              name="description"
              className="border p-2 w-full"
              required
            />
          </Col>
          <Col className='col-6'>
            <Text>Tipo de deporte:</Text>
            <TextInput
              name="sport_type"
              id="sport_type"
              className="border p-2 w-full"
              required
            />
          </Col>
          <Col className='col-6'>
            <Text>Pais:</Text>
            <TextInput
              type="text"
              name="country"
              id="country"
              className="border p-2 w-full"
            />
          </Col>
          <Col className='col-6'>
            <Text>Estado:</Text>
            <TextInput
              type="text"
              name="state"
              id="state"
              className="border p-2 w-full"
            />
          </Col>
          <Col className='col-6'>
            <Text>Fecha de inicio:</Text>
            <DatePicker
              id="start_date"
              className="border p-2 w-full"
              maxDate={initialState.endDate ?? undefined}
            />
          </Col>
          <Col className='col-6'>
            <Text>Fecha de finalizacion:</Text>
            <DatePicker
              id="end_date"
              className="border p-2 w-full"
              minDate={initialState.startDate ?? undefined}
            />
          </Col>
          <SubmitButton />
          <p aria-live="polite" className="sr-only" role="status">
            {state?.message}
          </p>
        </form>
      </Card>
    </main>
  );
};
