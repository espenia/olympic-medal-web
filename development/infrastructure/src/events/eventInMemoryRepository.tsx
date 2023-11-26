import IRepository from "../../../entities/common/interfaces/repository";
import EventDto from "../../../entities/events/event";
import { Service } from "typedi";
import Parameters from "../../../entities/common/interfaces/parameters";

@Service('eventinmemoryrepository')
export default class EventInMemoryRepository implements IRepository<EventDto> {

    private readonly events : EventDto[]

    constructor() {
        this.events = [];
    }
    deleteAsync(params: Parameters<EventDto>): Promise<void> {
        throw new Error("Method not implemented.");
    }
    putAsync(params: Parameters<EventDto>): Promise<void> {
        throw new Error("Method not implemented.");
    }

    createAsync(a: EventDto): Promise<void> {
        this.events.push(a);
        return Promise.resolve();
    }

    getAsync(params: Parameters<EventDto>): Promise<EventDto[]> {
        let events = this.events;

        if (params?.searchText) {
            events = events.filter(x => x.name?.toUpperCase().includes(params!.searchText!.toUpperCase()) ?? true);
        }

        if (params?.id) {
            events = events.filter(x => x.id === params!.id!);
        }

        return Promise.resolve(events);
    }

    private getFilter(eventId: number | null, name: string | undefined) : ((a: EventDto) => boolean) | null {
        var condition : ((x: EventDto) => boolean)[] = [];

        if (name) {
            condition.push((x: EventDto) => x.name?.toUpperCase().includes(name.toUpperCase()) ?? true);
        }

        if (eventId) {
            condition.push((x: EventDto) => x.id === eventId);
        }

        return condition.length > 0 ? (e: EventDto) => condition.every(x => x(e)) : null;
    }

}