import { Bold, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text } from "@tremor/react";
import EventDto from "../../../../entities/events/event";

export default function EventsTable({ events }: { events: EventDto[] }) {
    return (
      <Table>
        <TableHead>
            <TableRow>
                <TableHeaderCell>Nombre</TableHeaderCell>
                <TableHeaderCell>Categoria</TableHeaderCell>
                <TableHeaderCell>Fecha de inicio</TableHeaderCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {!events || events.length === 0 
             ? 
             <TableRow>
                <TableCell colSpan={5} align="center">No se encontraron eventos</TableCell> 
             </TableRow>
             : events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <a href={`/events/${event.id}`}>
                      <Bold color="blue">
                        {event.name}
                      </Bold>
                    </a>
                  </TableCell>
                  <TableCell>
                    <Text>{event.category}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{event.date?.toDateString() ?? "-"}</Text>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    );
  }