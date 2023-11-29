'use server';

import { z } from "zod";
import EventDto from "../../../../../entities/events/event";
import { GetEventUseCaseImpl } from "@/src/server-container";

export default async function getEvent(id: number) {
    GetEventUseCaseImpl.id = id;
    GetEventUseCaseImpl.name = undefined;
    const result = await GetEventUseCaseImpl.handle();
    return result?.at(0);
}

export async function editEvent(formData: FormData) {
  const schema = z.object({
    category: z.string().min(1),
    date: z.coerce.date(),
    description: z.string().min(1),
    distance: z.string().min(1),
    edition: z.string().min(1),
    location: z.string().min(1),
    name: z.string().min(1),
    officialSite: z.string().min(1).url(),
    participantsCount: z.coerce.number()
  });

  const data : EventDto = schema.parse({
    category: formData.get('category'),
    date: new Date(formData.get('date')?.toString() ?? ""),
    description: formData.get('description'),
    distance: formData.get('distance'),
    edition: formData.get('edition'),
    location: formData.get('location'),
    name: formData.get('name'),
    officialSite: formData.get('site'),
    participantsCount: formData.get('participants')
  });
  }