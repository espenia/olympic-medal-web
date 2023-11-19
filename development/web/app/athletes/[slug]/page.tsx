import { Card, Title, Text, Button, Flex } from "@tremor/react";
import { UUID } from "crypto";
import getUser from "./actions";
import { TrophyIcon } from "@heroicons/react/24/outline";

export default async function UserProfile({ params }: { params: { slug: UUID }}) {
    const user = await getUser(params.slug);

    return <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Card>
            <Flex justifyContent="between" className="pb-8">
                <Flex flexDirection='col' alignItems='start' className='ps-4'>
                    <Title>Perfil de atleta</Title>
                    <Text>{user?.firstName} {user.lastName}</Text>
                </Flex>
                <Flex justifyContent="end" className="pe-4">
                    <a href={`/athletes`}>
                        <Button variant="secondary">Volver a la lista</Button>
                    </a>
                </Flex>
            </Flex>
            <Flex flexDirection="row" alignItems="center">
                <TrophyIcon width={10}></TrophyIcon>
                <Text>Medallas:</Text>
            </Flex>
        </Card>
    </main>
}