'use client';

import {
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Bold,
    Badge,
  } from '@tremor/react';
import EventClassificationDto from '../../../../entities/events/classifications';
import { TrophyIcon } from '@heroicons/react/24/outline';
import { ShieldCheckIcon } from '@heroicons/react/20/solid';
import { StarIcon } from '@heroicons/react/24/solid';
  
  export default function ClassificationsTable({ classifications } : { classifications: any }) {
    const classificationsList = classifications as EventClassificationDto[] | undefined;

    return (
        <Table>
        <TableHead>
            <TableRow>
                <TableHeaderCell>Posicion</TableHeaderCell>
                <TableHeaderCell>Nombre y apellido</TableHeaderCell>
                <TableHeaderCell>Tiempo</TableHeaderCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {!classificationsList || classificationsList.length === 0 
             ? 
             <TableRow>
                <TableCell colSpan={3} align="center">No se encontraron clasificaciones.</TableCell> 
             </TableRow>
             : classificationsList.map((classification) => (
                    <TableRow key={classification.id} className="transition-colors hover:border-gray-50 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-200/30">
                        <TableCell align='center'>
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
                            {`${classification.athlete_first_name} ${classification.athlete_last_name}`}
                        </TableCell>
                        <TableCell>
                            {`${pad(classification.duration_hours ?? 0, 2)}:${pad(classification.duration_minutes ?? 0, 2)}:${pad(classification.duration_seconds ?? 0, 2)}`}
                        </TableCell>
                    </TableRow>
              ))}
        </TableBody>
      </Table>
    );

    function pad(num: number, size: number) {
        const s = "00" + num;
        return s.substring(s.length-size);
    }
  }
  