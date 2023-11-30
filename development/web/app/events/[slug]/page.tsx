import { Card, Title, Text, Button, Subtitle, Flex, Grid, Col } from '@tremor/react';
import getEvent from './actions';


export default async function Event({ params }: { params: { slug: number }}) {
  const event = await getEvent(params.slug);
  const open = event.date && event.date! >= new Date();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card>
        <Flex justifyContent="between" className="pb-8" alignItems="center">
          <Flex flexDirection='col' alignItems='start' className='ps-4'>
            <Title>{event?.name}</Title>
            <Subtitle>{event?.category}</Subtitle>
          </Flex>
          <Flex justifyContent="end" className="pe-4">
            <a href={`/events`}>
              <Button variant="secondary">Volver a la lista</Button>
            </a>
          </Flex>
        </Flex>
        <Grid numItems={1} numItemsMd={2} className="gap-5 p-4">
          <Col>
            <Text className="text-lg">{`Descripcion: ${event?.description}`}</Text>
          </Col>
            <Text className="text-lg">{`Localización: ${event?.location}`}</Text>
          <Col>
            <Text className="text-lg">{`Distancia: ${event?.distance}`}</Text>
          </Col>
          <Col>
            <Text className="text-lg">{`Edicion: ${event?.edition}`}</Text>
          </Col>
          <Col>
            <Text className={`text-lg ${open ? 'text-green-500' : 'text-red-500'}`}>Estado: {open ? "Abierto" : "Cerrado"}</Text>
          </Col>
        </Grid>
      </Card>
    </main>
  );
}

