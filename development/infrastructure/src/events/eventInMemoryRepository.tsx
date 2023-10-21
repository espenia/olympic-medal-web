import { UUID } from "crypto";
import IRepository from "../../../entities/common/interfaces/repository";
import EventDto from "../../../entities/events/event";

export default class EventInMemoryRepository implements IRepository<EventDto> {

    events : EventDto[]

    constructor() {
        this.events = [];
    }

    createAsync(a: EventDto): Promise<void> {
        this.events.push(a);

        return new Promise<void>(() => {});
    }

    getAsync(id: UUID | null, name: string | null): Promise<EventDto[]> {
        var eventfilter = this.getFilter(id, name);

        var result = eventfilter != null ? this.events.filter(eventfilter) : this.events;

        return new Promise<EventDto[]>((resolve) => resolve(result));
    }

    private getFilter(eventId: UUID | null, name: string | null) : ((a: EventDto) => boolean) | null {
        var condition : ((x: EventDto) => boolean)[] = [];

        if (name != null) {
            condition.push((x: EventDto) => x.name == name);
        }

        if (eventId != null) {
            condition.push((x: EventDto) => x.id === eventId);
        }

        return condition.length > 0 ? (e: EventDto) => condition.every(x => x(e)) : null;
    }

}