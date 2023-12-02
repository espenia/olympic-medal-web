import EventDto from "./event";

export default class EventClassificationDto {
    id?: number;
    event_id?: number;
    event_name?: string;
    event? : EventDto;
    position?: number;
    duration_hours?: number;
    duration_minutes?: number;
    duration_seconds?: number;
    athlete_first_name?: string;
    athlete_last_name?: string;
}