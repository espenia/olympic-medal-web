import { Bold, Button, Flex, Grid, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text } from "@tremor/react";
import EventDto from "../../../../entities/events/event";
import { EyeIcon, PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

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
          <TableRow className="transition-colors hover:border-gray-50 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-200/30">
            <TableCell colSpan={5}>
              <a style={{display: "block", fontWeight: "bold"}} href="/events/new">
                <Flex flexDirection="row" justifyContent="start" alignItems="center">
                  <PlusCircleIcon width={25}></PlusCircleIcon>
                  <Text className="ms-3">
                    Nuevo evento
                  </Text>
                </Flex>
              </a>
            </TableCell>
          </TableRow>
            {!events || events.length === 0 
             ? 
             <TableRow>
                <TableCell colSpan={5} align="center">No se encontraron eventos</TableCell> 
             </TableRow>
             : events.map((event) => (
              <TableRow key={event.id} className="transition-colors hover:border-gray-50 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-200/30">
              <TableCell>
                <a href={`/events/${event.id}`}>
                  <Text color="blue">
                    <Bold>
                      {event.name}
                    </Bold>                      
                  </Text>
                </a>
              </TableCell>
              <TableCell>
                {event.category}
              </TableCell>
              <TableCell>
                {event.date?.toDateString() ?? "-"}
              </TableCell>
            </TableRow>
              ))}
        </TableBody>
      </Table>
    );
  }