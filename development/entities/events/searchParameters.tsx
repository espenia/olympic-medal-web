import Parameters from '../common/interfaces/parameters'
import EventDto from './event'

export default class EventSearchParameters extends Parameters<EventDto> {
    name? : string;
    description?: string;
    sportType?: string;
    country?: string;
    state?: string;
}