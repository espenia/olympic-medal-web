import { z } from "zod";
import EventDto from "../../../../../entities/events/event";
import { GetEventUseCaseImpl } from "@/src/server-container";

export default async function getEvent(id: number) {
    GetEventUseCaseImpl.id = id;
    GetEventUseCaseImpl.name = undefined;
    const result = await GetEventUseCaseImpl.handle();
    return result?.at(0);
}

export async function editEvent(prevState: any, formData: FormData) {
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
  
    const data : EventDto = schema.parse({
      name: formData.get('name'),
      description: formData.get('description'),
      sport_type: formData.get('sport_type'),
      country: formData.get('country'),
      state: formData.get('state'),
      start_date: formData.get('start_date'),
      end_date: formData.get('end_date'),
    });
  
    try {
      return { message: `Event created successfully: ${data}` }
    } catch (e) {
      return { message: 'Failed to create' }
    }
  }