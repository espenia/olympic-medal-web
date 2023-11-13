import { Card, Title, Text } from "@tremor/react";
import { UUID } from "crypto";
import getEvent from "./actions";

export default async function EventResults({ params }: { params: { slug: UUID }}) {
    const event = await getEvent(params.slug);

    return <main>
        <Card>
            <Title>Resultados del evento {event?.name}</Title>
            <Text>Lista de clasificaciones</Text>
        </Card>
    </main>
}