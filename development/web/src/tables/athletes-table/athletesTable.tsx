import {
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text
  } from '@tremor/react';
import UserDto from '../../../../entities/users/user';
  
  export default function AthletesTable({ users }: { users: UserDto[] }) {
    return (
        <Table>
        <TableHead>
            <TableRow>
                <TableHeaderCell>Nombre</TableHeaderCell>
                <TableHeaderCell>Nombre de usuario</TableHeaderCell>
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
                <a key={user.id} style={{display: "block", fontWeight: "bold"}} href={`/athletes/${user.id}`}>
                    <TableRow className="transition-colors hover:border-gray-50 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-200/30">
                        <TableCell>
                            <Text>
                                {user.firstName} {user.lastName}
                            </Text>
                        </TableCell>
                        <TableCell>
                            <Text>{user.username}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{user.email}</Text>
                        </TableCell>
                    </TableRow>
                </a>
              ))}
        </TableBody>
      </Table>
    );
  }
  