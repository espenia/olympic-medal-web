import type IRepository from "../../../entities/common/interfaces/repository";
import EventDto from "../../../entities/events/event";
import IEventService from "../../../usecases/common/interfaces/eventService";
import EventCommentDto from "../../../entities/events/comment";
import Container, { Inject, Service } from "typedi";
import EventInMemoryRepository from "./eventInMemoryRepository";
import Parameters from "../../../entities/common/interfaces/parameters";
import EventRepository from "./eventRepository";

@Service('eventservice')
export default class EventService implements IEventService {
    private readonly repository : IRepository<EventDto> = Container.get<IRepository<EventDto>>('eventrepository');
    /**
     *
     */
    constructor() {
        EventRepository;
    }

    createEvent(event: EventDto): Promise<void> {
        return this.repository.createAsync(event);
        //return this.repository_in_mem.createAsync(event);
    }

    async getEventAsync(id: number): Promise<EventDto | undefined> {
        let events = await this.repository.getAsync(id);

        return events[0]!;
    }

    async commentEventAsync(comment: EventCommentDto): Promise<void> {
        let events = await this.repository.getAsync(comment.id);
        let event = events[0];
        event?.comments?.push(comment);
    }

    getEventsAsync(name: string | undefined): Promise<EventDto[]> {
        const parameters = new Parameters<EventDto>();
        parameters.searchText = name;
        //return this.repository_in_mem.getAsync(parameters);
        return this.repository.getAsync(parameters);
    }
}