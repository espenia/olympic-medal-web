import IUseCase from "../common/interfaces/useCase";
import type IEventService from "../common/interfaces/eventService";
import EventDto from "../../entities/events/event";
import { Inject, Service } from "typedi";

@Service('createeventusecase')
export default class CreateEventUseCase implements IUseCase<void> {
    private readonly service : IEventService;
    event? : EventDto

    /**
     *
     */
    constructor(@Inject('eventservice') service : IEventService) {
        this.service = service;
    }

    handle(): Promise<void> {
        return this.service.createEvent(this.event!);
    }

}