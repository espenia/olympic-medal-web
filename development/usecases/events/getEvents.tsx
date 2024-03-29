import EventDto from "../../entities/events/event";
import type IEventService from "../common/interfaces/eventService";
import IUseCase from "../common/interfaces/useCase";
import { Inject, Service } from "typedi";

@Service('geteventsusecase')
export default class GetEventsUseCase implements IUseCase<EventDto[]> {
    private readonly service : IEventService;
    name? : string;
    id?: number;
    category?: string;
    location?: string; 
    edition?: string;
    dateFrom?: Date; 
    dateTo?: Date; 
    athleteFirstName?: string; 
    athleteLastName?: string;
    athleteCountry?: string;

    /**
     *
     */
    constructor(@Inject('eventservice') service : IEventService) {
        this.service = service;
    }

    async handle(): Promise<EventDto[]> {
        if (this.id) {
            const event = await this.service.getEventAsync(this.id);
            return [event!];
        }
        return this.service.getEventsAsync(this.name, 
                                           this.category, 
                                           this.location, 
                                           this.edition, 
                                           this.dateFrom, 
                                           this.dateTo, 
                                           this.athleteFirstName, 
                                           this.athleteLastName, 
                                           this.athleteCountry);
    }
}