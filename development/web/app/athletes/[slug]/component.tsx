"use client";

import { Badge, Bold, Card, Flex, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import { getClassifications } from "./actions";
import { TrophyIcon } from '@heroicons/react/24/outline';
import { ShieldCheckIcon } from '@heroicons/react/20/solid';
import { StarIcon } from '@heroicons/react/24/solid';
import EventClassificationDto from "../../../../entities/events/classifications";

export default async function AthleteClassifications({classificationsList} : {classificationsList : any}) {
    //const classifications = classificationsList as EventClassificationDto[];
    const classifications: EventClassifications[] = [];
    return (
    <Card>
        <Flex justifyContent="center">
            Clasificaciones
        </Flex>
            {
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Posicion</TableHeaderCell>
                        <TableHeaderCell>Duracion</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {!classifications || classifications.length === 0 
                ? 
                <TableRow>
                    <TableCell colSpan={5} align="center">No se encontraron clasificaciones</TableCell> 
                </TableRow>
                : classifications.map((classification) => (
                <TableRow key={classification.id} className="transition-colors hover:border-gray-50 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-200/30">
                    
                    <TableCell>
                        {classification.position! < 4 ? 
                                <Badge 
                                    icon={classification.position == 1 ? TrophyIcon :
                                        classification.position == 2 ? StarIcon : 
                                        ShieldCheckIcon} 
                                    color={classification.position == 1 ? "yellow" : classification.position == 2 ? "slate" : "orange"}>
                                    {classification.position}
                                </Badge>
                                :
                                <Bold>
                                    {classification.position}
                                </Bold>
                            }
                    </TableCell>

                    <TableCell>
                        {`${pad(classification.duration_hours ?? 0, 2)}:${pad(classification.duration_minutes ?? 0, 2)}:${pad(classification.duration_seconds ?? 0, 2)}`}
                    </TableCell>
                </TableRow>
                ))}
                </TableBody>
            </Table>
            /*
            classifications.map((classification) => (
                <Grid numItems={1} numItemsMd={2} className="gap-5 p-4">
                    <Col>
                        <Text>
                            Evento: <Bold>{classification.event_id}</Bold>
                        </Text>
                    </Col>
                    <Col>
                        <Text>
                            Posición: <Bold>{classification.position}</Bold>
                        </Text>
                    </Col>
                    <Col>
                        <Text>
                            Duración: <Bold>{classification.duration_hours}:{classification.duration_minutes}:{classification.duration_seconds}</Bold>
                        </Text>
                    </Col>
                    <Col>
                        <Text>
                            Atleta: <Bold>{classification.athlete_first_name} {classification.athlete_last_name}</Bold>
                        </Text>
                    </Col>
                </Grid>
            ))
            */}
        </Card>
    );
}

function pad(num: number, size: number) {
    const s = "00" + num;
    return s.substring(s.length-size);
}