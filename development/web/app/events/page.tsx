import { Card, Title, Text } from '@tremor/react';
import Search from '../../src/search-bar/search'

export default function Events() {
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Eventos</Title>
      <Text>
        Conozca el detalle de los eventos disponibles a continuacion
      </Text>
      <Search />
      <Card className="mt-6">
        {/* <UsersTable users={users} /> */}
      </Card>
    </main>
    );
}