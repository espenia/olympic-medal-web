import { Card, Title, Text } from '@tremor/react';
import { Search } from '../../src/search-bar/search'

export default function User() {
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Usuarios</Title>
      <Text>
        Visualizacion de diferentes usuarios
      </Text>
      <Search />
      <Card className="mt-6">
        {/* <UsersTable users={users} /> */}
      </Card>
    </main>
    );
}