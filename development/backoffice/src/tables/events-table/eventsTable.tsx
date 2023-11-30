import { Button, Flex, Grid, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text } from "@tremor/react";
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
              <TableHeaderCell>Acciones</TableHeaderCell>
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
                <TableRow key={event.id}>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>
                    <Text>{event.category}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{event.date?.toDateString() ?? "-"}</Text>
                  </TableCell>
                  <TableCell>
                    <Flex flexDirection="row" justifyContent="start" alignItems="start">
                      <a href={`/events/${event.id}`}>
                        <Button size="xs" variant="light" className="me-5">
                          <EyeIcon width={20}>
                            </EyeIcon>
                        </Button>
                      </a>
                      <a>
                        <Button size="xs" variant="light" color="red">
                          <XMarkIcon width={20}>
                            </XMarkIcon>
                        </Button>
                      </a>
                    </Flex>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    );
  }