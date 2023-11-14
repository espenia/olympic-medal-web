import { UUID } from "crypto";

export default class EventClassifications {
    id?: UUID;
    eventId?: UUID;
    position?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}