'use client';

import "reflect-metadata";
import {Card, Title, Text, TextInput, Grid, Col, Flex} from '@tremor/react';

// @ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom'
import { recoverPassword } from './actions';
import { SubmitButton } from '@/src/submit-button/submitButton';

const initialState = {
  message: null,
}

export default function Recover() {
  const [state, formAction] = useFormState(setClientValues, initialState);

  async function setClientValues(previousState : any, formData : FormData): Promise<void | { message: string }> {
    return await recoverPassword(previousState, formData);
  }

  return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Card>
          <Title>Recuperar contraseña</Title>
          <Text>Ingresa el mail de tu usuario.</Text>
          <Text>Se enviara una direccion para recuperar contraseña</Text>
          <form action={formAction}>
            <Grid numItems={1} numItemsMd={2} className="gap-2 p-4">
              <Col>
                <Text>Email:</Text>
                <TextInput placeholder='' required={true} id='email' name='email' type="email" />
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
