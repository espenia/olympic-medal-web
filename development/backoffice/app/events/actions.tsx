import EventDto from '../../../entities/events/event';
import { GetEventUseCaseImpl } from '../../src/server-container'

export default async function getEvents(name?: string) : Promise<EventDto[]> {
    GetEventUseCaseImpl.name = name;
    return await GetEventUseCaseImpl.handle();
}