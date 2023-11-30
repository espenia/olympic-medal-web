import IRepository from "../../../entities/common/interfaces/repository";
import EventDto from "../../../entities/events/event";
import { Service } from "typedi";

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

    getAsync(...args: any[]): Promise<EventDto[]> {
        let events = this.events;
        const id : number | undefined = args.length >= 1 ? args.at(0) : undefined;
        const searchText : string | undefined = args.length >= 2 ? args.at(1) : undefined;

        if (searchText) {
            events = events.filter(x => x.name?.toUpperCase().includes(searchText!.toUpperCase()) ?? true);
        }

        if (id) {
            events = events.filter(x => x.id === id!);
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