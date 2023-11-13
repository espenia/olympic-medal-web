import { Button, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text } from "@tremor/react";
import EventDto from "../../../../entities/events/event";
import { redirect } from "next/navigation";

export default function EventsTable({ events }: { events: EventDto[] }) {
    return (
      <Table>
        <TableHead>
            <TableRow>
                <TableHeaderCell>Nombre</TableHeaderCell>
                <TableHeaderCell>Tipo de evento</TableHeaderCell>
                <TableHeaderCell>Fecha de inicio</TableHeaderCell>
                <TableHeaderCell>Fecha de finalizacion</TableHeaderCell>
                <TableHeaderCell>Acciones</TableHeaderCell>
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
                  <TableCell>{event.name}</TableCell>
                  <TableCell>
                    <Text>{event.sportType}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{event.startDate?.toDateString() ?? "-"}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{event.endDate?.toDateString() ?? "-"}</Text>
                  </TableCell>
                  <TableCell>
                    <a href={`/events/${event.id}`}>
                     <Button>Ver</Button>
                    </a>
                    <Button>Eliminar</Button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    );
  }