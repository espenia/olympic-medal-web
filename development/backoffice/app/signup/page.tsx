
import React, { useState } from 'react';
import { Card, Title, Text, TextInput, DatePicker, Grid, Col, Flex } from '@tremor/react';

// @ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom'
import { signup } from './actions';
import { SubmitButton } from '@/src/submit-button/submitButton';
import { signIn } from "next-auth/react";

const initialState = {
  message: null,
}

export default function Registro() {
  const [state, formAction] = useFormState(setClientValues, initialState);
  const [birthdate, setBirthDate] = useState(undefined as Date | undefined);

  async function setClientValues(previousState : any, formData : FormData): Promise<{ message : string } | undefined> {
    formData.set("birthdate", birthdate?.toISOString() ?? '');
    const res = await signup(previousState, formData);
    if (!res) {
      await signIn('credentials');
    }
    return res;
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card>
        <Title>Registro</Title>
        <Text>Ingresa tus datos para registrarte.</Text>
        <form action={formAction}>
          <Grid numItems={1} numItemsMd={2} className="gap-2 p-4">
            <Col>
              <Text>Nombre de usuario:</Text>
              <TextInput placeholder='' required={true} id='username' name='username' type="text" />
            </Col>
            <Col>
              <Text>Contraseña:</Text>
              <TextInput placeholder='' required={true}  name='password' id='password' type="password" />
            </Col>
            <Col>
              <Text>Nombre:</Text>
              <TextInput placeholder='' required={true} id='firstName' name='firstName' type="text" />
            </Col>
            <Col>
              <Text>Apellido:</Text>
              <TextInput placeholder='' required={true} id='lastName' name='lastName' type="text" />
            </Col>
            <Col>
              <Text>Email:</Text>
              <TextInput placeholder='' required={true} id='email' name='email' type="email" />
            </Col>
            <Col>
              <Text>Fecha de nacimiento:</Text>
              <DatePicker aria-required="true" onValueChange={e => setBirthDate(e)} />
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