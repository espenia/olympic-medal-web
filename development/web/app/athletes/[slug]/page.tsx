import { Card, Title, Text, Button, Flex, Grid, Col, Bold, Subtitle } from "@tremor/react";
import { UUID } from "crypto";
import getUser from "./actions";
import { TrophyIcon } from "@heroicons/react/24/outline";

export default async function UserProfile({ params }: { params: { slug: UUID }}) {
    const user = await getUser(params.slug);

    return <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Card>
                <Flex justifyContent="between" className="pb-8" alignItems="center">
                    <Flex flexDirection='col' alignItems='start' className='ps-4'>
                        <Title>Perfil del usuario</Title>
                        <Subtitle>{user?.username}</Subtitle>
                    </Flex>
                    <Flex justifyContent="end" className="pe-4">
                        <a href={`/athletes`}>
                            <Button variant="secondary">Volver a la lista</Button>
                        </a>
                    </Flex>
                </Flex>
                <Grid numItems={1} numItemsMd={2} className="gap-5 p-4">
                    <Col>
                        <Text>
                            Nombre: <Bold>{user?.firstName} {user?.lastName}</Bold>
                        </Text>
                    </Col>
                    <Col>
                      <Text>
                        Email: <Bold>{user?.email}</Bold>
                      </Text>
                    </Col>
                    <Col>
                        <Text>
                        Fecha de nacimiento: <Bold>{user?.birthdate?.toDateString()}</Bold> 
                        </Text>
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
}
