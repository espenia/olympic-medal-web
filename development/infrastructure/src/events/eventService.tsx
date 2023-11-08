import { UUID } from "crypto";
import type IRepository from "../../../entities/common/interfaces/repository";
import EventDto from "../../../entities/events/event";
import IEventService from "../../../usecases/common/interfaces/eventService";
import EventCommentDto from "../../../entities/events/comment";
import Container, { Service } from "typedi";
import EventInMemoryRepository from "./eventInMemoryRepository";

@Service('eventservice')
export default class EventService implements IEventService {
    private readonly repository : IRepository<EventDto> = Container.get<IRepository<EventDto>>('eventinmemoryrepository');

    /**
     *
     */
    constructor() {
        EventInMemoryRepository;
    }

    createEvent(event: EventDto): Promise<void> {
        return this.repository.createAsync(event);
    }

    async getEventAsync(id: UUID): Promise<EventDto | null> {
        var events = await this.repository.getAsync(id);

        return !events.at(0) ? null : events.at(0)!;
    }

    async commentEventAsync(comment: EventCommentDto): Promise<void> {
        var events = await this.repository.getAsync(comment.eventId);
        var event = events.at(0);
        event?.comments?.push(comment);
    }

    getEventsAsync(name: string | undefined): Promise<EventDto[]> {
        return this.repository.getAsync(name);
    }
}