'use client';

import { Card, Title, Text, TextInput, Grid, Col, Accordion, Button, AccordionHeader, AccordionBody, Subtitle } from '@tremor/react';
import AthletesTable from '@/src/tables/athletes-table/athletesTable';
import { useState } from 'react';
import UserDto from '../../../entities/users/user';
import { getUsers } from './actions';

export default function User() {
  // const mockUser = () => {
  //   const user = new UserDto();
  //   user.id = '0000-0000-0000-0000-0000';
  //   user.firstName = 'juan';
  //   user.lastName = 'perez';
  //   user.email = 'sad@asd.com';
  //   user.username = 'jperez';
  //   return user;
  // };
  const [users, setUsers] = useState<UserDto[]>([]);
  const [firstName, setFirstName] = useState<string | undefined>();
  const [lastName, setLastName] = useState<string | undefined>();
  const searchUsers = getUsers(firstName, lastName).then(users => setUsers(users));

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Atletas</Title>
      <Subtitle>
        Busque a sus amigos y compare sus medallas
      </Subtitle>
      <Accordion className='mt-4'>
        <AccordionHeader>Filtros</AccordionHeader>
        <AccordionBody>
        <Grid numItemsMd={2} numItems={1} className='p-4 gap-3'>
          <Col>
            <Text>Nombre</Text>
            <TextInput onValueChange={setFirstName} value={firstName} placeholder=''></TextInput>
          </Col>
          <Col>
            <Text>Apellido</Text>
            <TextInput onValueChange={setLastName} value={lastName} placeholder=''></TextInput>
          </Col>
        </Grid>
        <Button onClick={() => searchUsers} variant='primary' className='ms-4'>Buscar</Button>
        </AccordionBody>
      </Accordion>
      <Card className="mt-6">
        <AthletesTable users={users} />
      </Card>
    </main>
    );
}