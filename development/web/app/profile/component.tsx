import { TrophyIcon } from '@heroicons/react/24/outline';
import { Card, Flex, Title, Button, Grid, Col, TextInput, Text, Subtitle } from '@tremor/react';
import UserDto from '../../../entities/users/user';

export default function UserProfile({userProps} : {userProps : UserDto}) {
    const user = userProps;

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
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
                        <TextInput readOnly placeholder='' name='firstName' id='firstName' value={user.firstName} required>
                        </TextInput>
                    </Col>
                    <Col>
                        <Text>
                            Apellido 
                        </Text>
                        <TextInput readOnly placeholder='' name='lastName' id='lastName' value={user.lastName} required>
                        </TextInput>
                    </Col>
                    <Col>
                        <Text>
                            Email 
                        </Text>
                        <TextInput readOnly placeholder='' type='email' name='email' id='email' value={user.email} required>
                        </TextInput>
                    </Col>
                    <Col>
                        <Text>
                            Fecha de nacimiento
                        </Text>
                        <TextInput readOnly value={new Date(user.birthdate ?? new Date()).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}></TextInput>
                    </Col>
                    <Col>
                        <Text>Privacidad del perfil</Text>
                        <TextInput readOnly value='Publico'></TextInput>
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
            </Card>
        </main>
    );
}
