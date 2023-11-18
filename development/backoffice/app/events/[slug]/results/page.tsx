import { Card, Title, Text, Button, Flex } from "@tremor/react";
import { UUID } from "crypto";
import getEvent from "./actions";

export default async function EventResults({ params }: { params: { slug: UUID }}) {
    const event = await getEvent(params.slug);

    return <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Card>
            <Flex justifyContent="between" className="pb-8">
                <Flex flexDirection='col' alignItems='start' className='ps-4'>
                    <Title>Resultados del evento {event?.name}</Title>
                    <Text>Lista de clasificaciones</Text>
                </Flex>
                <Flex justifyContent="end" className="pe-4">
                    <a href={`/events/${params.slug}`}>
                        <Button variant="secondary">Volver al evento</Button>
                    </a>
                </Flex>
            </Flex>
            <input type="file" accept=".csv"></input>
        </Card>
    </main>
}