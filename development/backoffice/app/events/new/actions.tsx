'use server'

import {z} from 'zod'
import { CreateEventUseCaseImpl } from '../../../src/server-container';
import {redirect} from "next/navigation";
import EventClassificationDto from "../../../../entities/events/classifications";


export async function formatValuesAndCreate(formData : FormData) {
    const date = new Date(formData.get('date') as String);
    const file : File = formData.get('csv') as File;

    let classifications : EventClassificationDto[] = [];
    const data = await file.text();
    data.split('\r\n').forEach((row, index) => {
        const [durationHours, durationMinutes, durationSeconds, position, athleteFirstName, athleteLastName] = row.split(',');
        if (index === 0)
            return;
        classifications.push({
            duration_hours: parseInt(durationHours),
            duration_minutes: parseInt(durationMinutes),
            duration_seconds: parseInt(durationSeconds),
            position: parseInt(position),
            athlete_first_name: athleteFirstName,
            athlete_last_name: athleteLastName,
        });
    });
    const res = await create(formData, classifications, date);
    if (!res) {
        return redirect("/events");
    }
    return res;
}

export async function create(formData: FormData, classifications: EventClassificationDto[], date: Date) {
  const schema = z.object({
    name: z.string().min(1),
    description: z.string(),
    category: z.string(),
    location: z.string(),
    date: z.date(),
    participantCount: z.number(),
    distance: z.number().min(1),
    officialSite: z.string(),
    edition: z.number().min(1),
  });

  const data  = schema.parse({
    name: formData.get('name'),
    description: formData.get('description'),
    category: formData.get('category'),
    location: formData.get('location'),
    edition: parseInt(formData.get('edition') as string),
    date: date,
    participantCount: parseInt(formData.get('participantCount') as string) | undefined,
    distance: parseInt(formData.get('distance') as string),
    officialSite: formData.get('officialSite')
  });

  try {
    const event = {
        name: data.name,
        description: data.description,
        edition: data.edition,
        classifications: classifications,
        participant_count: data.participantCount,
        category: data.category,
        distance: data.distance,
        location: data.location,
        date: data.date,
        official_site: data.officialSite,
    };
    CreateEventUseCaseImpl.event = event;
    await CreateEventUseCaseImpl.handle();
    return;
  } catch (e) {
    return { message: 'Failed to create' }
  }
}