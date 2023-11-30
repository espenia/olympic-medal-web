import { Service } from "typedi";
import IRepository from "../../../entities/common/interfaces/repository";
import EventDto from "../../../entities/events/event";
import type IGateway from "../interfaces/gateway";

@Service('eventrepository')
export default class EventRepository implements IRepository<EventDto> {
    private readonly gateway : IGateway;

    /**
     *
     */
    constructor(gateway : IGateway) {
        this.gateway = gateway;
    }
    getOneAsync(...args: any[]): Promise<EventDto> {
        throw new Error("Method not implemented.");
    }
    deleteAsync(...args: any[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    putAsync(...args: any[]): Promise<void> {
        throw new Error("Method not implemented.");
    }

    getAsync(...args: any[]): Promise<EventDto[]> {
        return this.gateway.getEvents(...args);
    }

    createAsync(a: EventDto): Promise<void> {
        return this.gateway.createEvent(a);
    }

}