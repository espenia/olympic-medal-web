import EventCommentDto from "./comment";

export default class EventDto {
    id?: number | undefined;
    category? : string;
    date?: Date;
    description?: string;
    distance?: string;
    edition?: string;
    location?: string;
    name?: string;
    officialSite?: string;
    participantsCount?: number;
    comments?: EventCommentDto[];
}