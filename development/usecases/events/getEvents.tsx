import EventDto from "../../entities/events/event";
import IEventService from "../common/interfaces/eventService";
import IUseCase from "../common/interfaces/useCase";

export default class GetEventsUseCase implements IUseCase<EventDto[]> {
    private readonly service : IEventService;
    name : string | null;

    /**
     *
     */
    constructor(service : IEventService) {
        this.service = service;
    }

    handle(): Promise<EventDto[]> {
        return this.service.getEventsAsync(this.name);
    }
}