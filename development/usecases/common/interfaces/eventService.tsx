import EventDto from "../../../entities/events/event";
import EventCommentDto from "../../../entities/events/comment";

export default interface IEventService {
    createEvent(event: EventDto) : Promise<void>;
    commentEventAsync(comment: EventCommentDto): Promise<void>;
    getEventsAsync(name: string | undefined, 
                   category: string | undefined, 
                   location: string | undefined, 
                   edition: string | undefined, 
                   dateFrom: Date | undefined, 
                   dateTo: Date | undefined, 
                   athleteFirstName: string | undefined, 
                   athleteLastName: string | undefined, 
                   athleteCountry: string | undefined) : Promise<EventDto[]>;
    getEventAsync(id: number) : Promise<EventDto | undefined>;
}