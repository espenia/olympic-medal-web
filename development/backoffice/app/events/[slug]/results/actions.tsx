import { GetEventUseCaseImpl } from "@/src/server-container";
import EventDto from "../../../../../entities/events/event";

export default async function getEvent(id: number) {
    GetEventUseCaseImpl.id = id;
    GetEventUseCaseImpl.name = undefined;
    const result = await GetEventUseCaseImpl.handle();
    return result?.at(0) ?? new EventDto();
}