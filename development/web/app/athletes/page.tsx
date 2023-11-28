'use server';

import { Title, Subtitle, Accordion, AccordionBody, AccordionHeader, Card, Col, Grid, TextInput, Text } from '@tremor/react';
import { filter, getUsers } from './actions';
import { SubmitButton } from '@/src/submit-button/submitButton';
import AthletesTable from '@/src/tables/athletes-table/athletesTable';

export default async function User({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
    const params = {
      firstName: searchParams?.first_name,
      lastName: searchParams?.last_name
    }

    const users = await getUsers(params.firstName, params.lastName);

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Atletas</Title>
      <Subtitle>
        Busque a sus amigos y compare sus medallas
      </Subtitle>
      <Accordion className='mt-4'>
        <AccordionHeader>Filtros</AccordionHeader>
        <AccordionBody>
        <form action={filter}>
            <Grid numItemsMd={2} numItems={1} className='p-4 gap-3'>
              <Col>
                <Text>Nombre</Text>
                <TextInput name="first_name" placeholder={params.firstName ?? ""}></TextInput>
              </Col>
              <Col>
                <Text>Apellido</Text>
                <TextInput name="last_name" placeholder={params.lastName ?? ""}></TextInput>
              </Col>
              <Col>
                <SubmitButton></SubmitButton>
              </Col>
            </Grid>
        </form>
        </AccordionBody>
      </Accordion>
      <Card className="mt-6">
      <AthletesTable users={users} />
    </Card>
    </main>
    );
}