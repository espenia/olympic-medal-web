import {z} from 'zod'
import { CreateEventUseCaseImpl } from '../../../src/server-container';
import parseCSV from "../../../app/utils/csv-parse";

export async function create(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string().min(1),
    description: z.string(),
    category: z.string(),
    location: z.string(),
    date: z.string().min(1),
    participantCount: z.number(),
    distance: z.number().min(1),
    officialSite: z.string(),
    edition: z.number().min(1),
    csv: z.any(),
  });

  const data  = schema.parse({
    name: formData.get('name'),
    description: formData.get('description'),
    category: formData.get('category'),
    location: formData.get('location'),
    edition: parseInt(formData.get('edition') as string),
    date: formData.get('date'),
    participantCount: parseInt(formData.get('participantCount') as string) | undefined,
    distance: parseInt(formData.get('distance') as string),
    officialSite: formData.get('officialSite'),
    csv: formData.get('csv'),
  });

  try {
    const event = {
        name: data.name,
        description: data.description,
        edition: data.edition,
        classifications: [],
        participant_count: data.participantCount,
        category: data.category,
        distance: data.distance,
        location: data.location,
        official_site: data.officialSite,
        date: data.date,
    };
    const csv_data = await parseCSV(data.csv)
    csv_data.split('\r\n').forEach((row: string, index: number) => {
        const [durationHours, durationMinutes, durationSeconds, position, athleteFirstName, athleteLastName] = row.split(',');
        if (index === 0)
            return;
        event.classifications.push({
            duration_hours: parseInt(durationHours),
            duration_minutes: parseInt(durationMinutes),
            duration_seconds: parseInt(durationSeconds),
            position: parseInt(position),
            athlete_first_name: athleteFirstName,
            athlete_last_name: athleteLastName,
        });
    });
    CreateEventUseCaseImpl.event = event;
    await CreateEventUseCaseImpl.handle();
    return;
  } catch (e) {
    return { message: 'Failed to create' }
  }
}