'use client';

import { SubmitButton } from '@/src/submit-button/submitButton';
import { TrophyIcon } from '@heroicons/react/24/outline';
import { Card, Flex, Title, Button, Grid, Col, TextInput, Select, SelectItem, Text, Subtitle, DatePicker } from '@tremor/react';
import UserDto from '../../../entities/users/user';

// @ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom'

import { changePrivacy } from './actions';
import { useState } from 'react';
import { redirect } from 'next/navigation';

const initialState = {
    message: null 
}

export default function UserProfile({userProps} : {userProps : object}) {
    const user : UserDto = userProps;
    const [state, formAction] = useFormState(setClientValues, initialState);
    const [birthdate, setBirthDate] = useState<Date | undefined>(user?.birthdate);
    const [isProfilePublic, setIsProfilePublic] = useState<boolean>(user?.isProfilePublic ?? false);

    async function setClientValues(previousState : any, formData : FormData): Promise<{ message : string } | undefined> {
        formData.set("birthdate", birthdate?.toISOString() ?? '');
        formData.set("isProfilePublic", isProfilePublic.toString());
        const res = await changePrivacy(previousState, formData);
        if (!res) {
          redirect("/");
        }
        return res;
      }

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <form action={formAction}>
            <Card>
                <Flex justifyContent="between" className="pb-8" alignItems="center">
                    <Flex flexDirection='col' alignItems='start' className='ps-4'>
                        <Title>Mi perfil</Title>
                        <Subtitle>{user?.username}</Subtitle>
                    </Flex>
                    <Flex justifyContent="end" className="pe-4">
                        <a href={`/`}>
                            <Button variant="secondary" type='button'>Volver al inicio</Button>
                        </a>
                    </Flex>
                </Flex>
                <Grid numItems={1} numItemsMd={2} className="gap-5 p-4">
                    <Col>
                        <Text>
                            Nombre 
                        </Text>
                        <TextInput placeholder='' name='firstName' id='firstName' value={user.firstName} required>
                        </TextInput>
                    </Col>
                    <Col>
                        <Text>
                            Apellido 
                        </Text>
                        <TextInput placeholder='' name='lastName' id='lastName' value={user.lastName} required>
                        </TextInput>
                    </Col>
                    <Col>
                        <Text>
                            Email 
                        </Text>
                        <TextInput placeholder='' type='email' name='email' id='email' value={user.email} required>
                        </TextInput>
                    </Col>
                    <Col>
                        <Text>
                            Fecha de nacimiento
                        </Text>
                        <DatePicker onValueChange={setBirthDate} defaultValue={new Date()} aria-required>
                        </DatePicker>
                    </Col>
                    <Col>
                        <Text>Privacidad del perfil</Text>
                        <Select onValueChange={e => setIsProfilePublic(e === 'true')} value={isProfilePublic.toString()} aria-required>
                            <SelectItem value={'true'}>
                                Publico
                            </SelectItem>
                            <SelectItem value={'false'}>
                                Privado
                            </SelectItem>
                        </Select>
                    </Col>
                    <Col>
                        <Flex flexDirection="row" alignItems="center" justifyContent="start">
                            <Text color="amber">
                                <TrophyIcon color="amber" width={20}></TrophyIcon>
                            </Text>
                            <Text className="ms-3">Medallas</Text>
                        </Flex>
                        <Flex flexDirection="row" alignItems="center" justifyContent="evenly">
                            <Text>Oro: {user?.goldMedals}</Text>
                            <Text>Plata: {user?.silverMedals}</Text>
                            <Text>Bronce: {user?.bronzeMedals}</Text>
                        </Flex>
                    </Col>
                </Grid>
                <Flex justifyContent='end' className='pe-4'>
                    <SubmitButton></SubmitButton>
                </Flex>
                {state && state.message && state.message.length > 0 && <Text>{state.message}</Text>}
            </Card>
            </form>
        </main>
    );
}
