import {
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text,
    Bold,
    Flex,
  } from '@tremor/react';
import UserDto from '../../../../entities/users/user';
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';
  
  export default function AthletesTable({ users }: { users: UserDto[] }) {
    return (
        <Table>
        <TableHead>
            <TableRow>
                <TableHeaderCell>Nombre de usuario</TableHeaderCell>
                <TableHeaderCell>Nombre</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {!users || users.length === 0 
             ? 
             <TableRow>
                <TableCell colSpan={5} align="center">No se encontraron usuarios.</TableCell> 
             </TableRow>
             : users.map((user) => (
                    <TableRow key={user.id} className="transition-colors hover:border-gray-50 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-200/30">
                        <TableCell>
                            <a href={`/athletes/${user.id}`}>
                                <Text color='blue'>
                                    <Flex flexDirection='row' justifyContent='start'>
                                        <Bold>
                                            {user.username}
                                        </Bold>
                                        <MagnifyingGlassCircleIcon width={20}></MagnifyingGlassCircleIcon>
                                    </Flex>
                                </Text>
                            </a>
                        </TableCell>
                        <TableCell>
                            <Text>
                                {user.firstName} {user.lastName} 
                            </Text>
                        </TableCell>
                        <TableCell>
                            <Text>{user.email}</Text>
                        </TableCell>
                    </TableRow>
              ))}
        </TableBody>
      </Table>
    );
  }
  