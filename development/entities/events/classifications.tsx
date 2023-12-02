import EventDto from "./event";

export default class EventClassificationDto {
    id?: number;
    position?: number;
    duration_hours?: number;
    duration_minutes?: number;
    duration_seconds?: number;
    event_name?: string;
    event?: EventDto;
}