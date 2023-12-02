'use server';

import { z } from "zod";
import EventDto from "../../../../../entities/events/event";
import { GetEventUseCaseImpl } from "@/src/server-container";

export default async function getEvent(id: number) {
    GetEventUseCaseImpl.id = id;
    GetEventUseCaseImpl.name = undefined;
    const result = await GetEventUseCaseImpl.handle();
    return result?.at(0) ?? new EventDto();
}

export async function editEvent(formData: FormData) {
  const schema = z.object({
    category: z.string().min(1),
    date: z.coerce.date(),
    description: z.string().min(1),
    distance: z.number().min(1),
    edition: z.number().min(1),
    location: z.string().min(1),
    name: z.string().min(1),
    officialSite: z.string().min(1).url(),
    participantsCount: z.coerce.number()
  });

  const event : EventDto = schema.parse({
    name: formData.get('name'),
    description: formData.get('description'),
    category: formData.get('category'),
    location: formData.get('location'),
    edition: parseInt(formData.get('edition') as string),
    date: new Date(formData.get('date')?.toString() ?? ""),
    participantsCount: parseInt(formData.get('participantCount') as string),
    distance: parseInt(formData.get('distance') as string),
    officialSite: formData.get('officialSite')
  });

  }