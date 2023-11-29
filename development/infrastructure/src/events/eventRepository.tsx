import IRepository from "../../../entities/common/interfaces/repository";
import EventDto from "../../../entities/events/event";
import Container, { Service } from "typedi";
import Parameters from "../../../entities/common/interfaces/parameters";
import IGateway from "../interfaces/gateway";
import ApiGateway from "../gateways/gateway";

@Service('eventrepository')
export default class EventRepository implements IRepository<EventDto> {

    private readonly gateway : IGateway = Container.get<IGateway>('apigateway');

    constructor() {
        ApiGateway;
    }
    getAsync(params: any []): Promise<EventDto[]> {
        return this.gateway.getEvents(params);
    }

    createAsync(a: EventDto): Promise<void> {
        return this.gateway.createEvent(a);
    }

    /*getAsync(params: Parameters<EventDto>): Promise<EventDto[]> {
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
        let condition : ((x: EventDto) => boolean)[] = [];

        if (name) {
            condition.push((x: EventDto) => x.name?.toUpperCase().includes(name.toUpperCase()) ?? true);
        }

        if (eventId) {
            condition.push((x: EventDto) => x.id === eventId);
        }

        return condition.length > 0 ? (e: EventDto) => condition.every(x => x(e)) : null;
    }*/

}