import EventDto from "./event";

export default class EventClassificationDto {
    id?: number;
    position?: number;
    duration_hours?: number;
    duration_minutes?: number;
    duration_seconds?: number;
    event_name?: string;
    event_id?: number;
    athlete_first_name?: string;
    athlete_last_name?: string;
    event?: EventDto;
}