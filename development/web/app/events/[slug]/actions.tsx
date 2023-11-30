import EventDto from "../../../../entities/events/event";
import { GetEventUseCaseImpl } from "../../../src/server-container"

export default async function getEvent(id: number) {
    GetEventUseCaseImpl.name = undefined;
    GetEventUseCaseImpl.id = id;
    const events = await GetEventUseCaseImpl.handle();

    return events.at(0) ?? new EventDto();
}