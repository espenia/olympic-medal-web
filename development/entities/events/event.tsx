import { UUID } from "crypto";
import EventCommentDto from "./comment";

export default class EventDto {
    id?: UUID;
    name? : string;
    description?: string;
    sportType?: string;
    country?: string;
    state?: string;
    startDate?: Date;
    endDate?: Date;
    comments?: EventCommentDto[];

    /**
     *
     */
    constructor(id: UUID | undefined = undefined, name: string | undefined = undefined, description: string | undefined = undefined, sportType: string | undefined = undefined, country: string | undefined = undefined, state: string | undefined = undefined, startDate: Date | undefined = undefined, endDate: Date | undefined = undefined, comments: EventCommentDto[] | undefined = undefined) {
        this.id = id;
        this.name = name;
        this.comments = comments ?? [];
        this.description = description;
        this.sportType = sportType;
        this.country = country;
        this.state = state;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}