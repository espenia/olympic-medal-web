import { Card, Title, Button, Subtitle, Flex, Grid, Col, Divider, Bold, Badge } from '@tremor/react';
import getEvent from './actions';
import ClassificationsTable from '@/src/tables/events-table/classificationsTable';


export default async function Event({ params }: { params: { slug: number }}) {
  const event = await getEvent(params.slug);
  const open = event?.date && event.date! >= new Date();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card>
        <Flex justifyContent="between" className="pb-8" alignItems="center">
          <Flex flexDirection='col' alignItems='start' className='ps-4'>
            <Flex flexDirection='row' justifyContent='start' alignItems='center' className='gap-3'>
              <Title>
                {event?.name}
              </Title>
              <Badge color={open ? "green" : "red"}>
                {open ? "Abierto" : "Cerrado"}
              </Badge>
            </Flex>
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
            <Flex flexDirection='row' justifyContent='start' className='gap-2'>
              <Bold>
                Descripcion:
              </Bold>
              {event?.description}
            </Flex>
          </Col>
          <Col>
            <Flex flexDirection='row' justifyContent='start' className='gap-2'>
              <Bold>
                Ubicacion:
              </Bold>
              {event?.location}
            </Flex>
          </Col>
          <Col>
            <Flex flexDirection='row' justifyContent='start' className='gap-2'>
              <Bold>
                Distancia: 
              </Bold>
              {event?.distance}
            </Flex>
          </Col>
          <Col>
            <Flex flexDirection='row' justifyContent='start' className='gap-2'>
              <Bold>
                Edicion: 
              </Bold>
              {event?.edition}
            </Flex>
          </Col>
        </Grid>
        <Divider></Divider>
        <Title className='ps-4'>
          Clasificaciones
        </Title>
        <ClassificationsTable classifications={JSON.parse(JSON.stringify(event?.classifications))}></ClassificationsTable>
      </Card>
    </main>
  );
}

