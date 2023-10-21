import { UUID } from "crypto";
import EventDto from "../../../entities/events/event";

export default interface IEventService {
    commentEventAsync(eventId: UUID, comment: string): Promise<void>;
    getEventsAsync(name: string | null) : Promise<EventDto[]>;
    getEventAsync(id: UUID) : Promise<EventDto | null>;
}