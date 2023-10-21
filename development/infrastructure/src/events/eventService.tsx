import { UUID, randomUUID } from "crypto";
import IRepository from "../../../entities/common/interfaces/repository";
import EventDto from "../../../entities/events/event";
import IEventService from "../../../usecases/common/interfaces/eventService";
import EventCommentDto from "../../../entities/events/comment";

export default class EventService implements IEventService {
    private readonly repository : IRepository<EventDto>

    /**
     *
     */
    constructor(repository : IRepository<EventDto>) {
        this.repository = repository;
    }
    async getEventAsync(id: UUID): Promise<EventDto | null> {
        var events = await this.repository.getAsync(id);

        return !events.at(0) ? null : events.at(0)!;
    }

    async commentEventAsync(eventId: UUID, comment: string): Promise<void> {
        var eventComment = new EventCommentDto();
        eventComment.id = randomUUID();
        eventComment.content = comment;
        var events = await this.repository.getAsync(eventId);
        var event = events.at(0);
        event?.comments.push(eventComment);
    }

    getEventsAsync(name: string | null): Promise<EventDto[]> {
        return this.repository.getAsync(name);
    }
}