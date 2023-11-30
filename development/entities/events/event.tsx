import EventCommentDto from "./comment";
import EventClassificationDto from "./classifications";

export default class EventDto {
    id?: number | undefined;
    category? : string;
    date?: Date;
    description?: string;
    distance?: number;
    edition?: number;
    location?: string;
    name?: string;
    officialSite?: string;
    participantsCount?: number;
    classifications?: EventClassificationDto[];
}