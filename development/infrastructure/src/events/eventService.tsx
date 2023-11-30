import type IRepository from "../../../entities/common/interfaces/repository";
import EventDto from "../../../entities/events/event";
import IEventService from "../../../usecases/common/interfaces/eventService";
import EventCommentDto from "../../../entities/events/comment";
import { Service } from "typedi";

@Service('eventservice')
export default class EventService implements IEventService {
    private readonly repository : IRepository<EventDto>;

    /**
     *
     */
    constructor(repository : IRepository<EventDto>) {
        this.repository = repository;
    }

    createEvent(event: EventDto): Promise<void> {
        return this.repository.createAsync(event);
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

    async getEventsAsync(name: string | undefined, 
                         category: string | undefined, 
                         location: string | undefined, 
                         edition: string | undefined, 
                         dateFrom: Date | undefined, 
                         dateTo: Date | undefined, 
                         athleteFirstName: string | undefined, 
                         athleteLastName: string | undefined, 
                         athleteCountry: string | undefined): Promise<EventDto[]> {
        return this.repository.getAsync(undefined, name, category, location, edition, dateFrom, dateTo, athleteFirstName, athleteLastName, athleteCountry);
    }
}