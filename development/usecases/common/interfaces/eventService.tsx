import EventDto from "../../../entities/events/event";
import EventCommentDto from "../../../entities/events/comment";

export default interface IEventService {
    createEvent(event: EventDto) : Promise<void>;
    commentEventAsync(comment: EventCommentDto): Promise<void>;
    getEventsAsync(name: string | undefined) : Promise<EventDto[]>;
    getEventAsync(id: number) : Promise<EventDto | undefined>;
}