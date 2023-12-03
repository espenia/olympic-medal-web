'use client';

import "reflect-metadata";
import {Card, Title, Text, TextInput, Grid, Col, Flex} from '@tremor/react';

// @ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom'
import { changePassword } from './actions';
import { SubmitButton } from '@/src/submit-button/submitButton';
import UserDto from "../../../entities/users/user";

const initialState = {
  message: null,
}

export default function ChangePassword() {
  const [state, formAction] = useFormState(setClientValues, initialState);

  async function setClientValues(previousState : any, formData : FormData): Promise<void | { message: string }> {
    return await changePassword(previousState, formData);
  }

  return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Card>
          <Title>Cambiar contraseña</Title>
          <form action={formAction}>
            <Grid numItems={1} numItemsMd={2} className="gap-2 p-4">
              <Col>
                <Text>Email:</Text>
                <TextInput placeholder='' required={true} id='email' name='email' type="email" />
              </Col>
              <Col>
                <Text>Contraseña:</Text>
                <TextInput placeholder='' required={true}  name='password' id='password' type="password" />
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
