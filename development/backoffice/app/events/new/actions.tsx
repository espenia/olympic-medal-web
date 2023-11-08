'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import EventDto from '../../../../entities/events/event'

export async function create(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    sport_type: z.string().min(1),
    country: z.string().min(1),
    state: z.string().min(1),
    end_date: z.coerce.date(),
    start_date: z.coerce.date()
  }).refine((data) => data.start_date > data.end_date, {
    message: "End date cannot be earlier than start date.",
    path: ["end_date"],
  });

  const data = schema.parse({
    name: formData.get('username'),
    description: formData.get('password'),
    sport_type: formData.get('sport_type'),
    country: formData.get('country'),
    state: formData.get('state'),
    start_date: formData.get('start_date'),
    end_date: formData.get('end_date'),
  });

  const event = new EventDto(undefined,
                             data.name, 
                             data.description, 
                             data.sport_type,
                             data.country,
                             data.state,
                             new Date(data.start_date),
                             new Date(data.end_date))

  try {
    //await 
    revalidatePath('/')
    return { message: `Event created successfully: ${data}` }
  } catch (e) {
    return { message: 'Failed to create' }
  }
}