import EventCommentDto from "./comment";
import EventClassificationDto from "./classifications";

export default class EventDto {
    id?: number | undefined;
    name? : string;
    description?: string;
    date_to?: string;
    date_from?: string;
    edition?: number;
    athlete_first_name?: string;
    athlete_last_name?: string;
    classifications?: EventClassificationDto[];
    participants_count?: number;
    category?: string;
    distance?: number;
    location?: string;
    official_site?: string;
    date?: Date;
    comments?: EventCommentDto[];

    /**
     *
     */
    constructor(id: number | undefined = undefined, name: string | undefined = undefined, description: string | undefined = undefined,
                category: string | undefined = undefined, location: string | undefined = undefined, participantCount: number | undefined = undefined,
                dateFrom: string | undefined = undefined, dateTo: string | undefined = undefined, comments: EventCommentDto[] | undefined = undefined,
                edition: number | undefined = undefined, athleteFirstName: string | undefined = undefined, athleteLastName: string | undefined = undefined,
                classifications: EventClassificationDto[] | [] = [], date: Date | undefined = undefined,
                distance: number | undefined = undefined, officialSite: string | undefined = undefined) {
        this.id = id;
        this.name = name;
        this.comments = comments ?? [];
        this.description = description;
        this.category = category;
        this.location = location;
        this.edition = edition;
        this.athlete_first_name = athleteLastName;
        this.athlete_last_name = athleteLastName;
        this.participants_count = participantCount;
        this.date_to = dateTo;
        this.date_from = dateFrom;
        this.classifications = classifications;
        this.date = date;
        this.distance = distance;
        this.official_site = officialSite;
    }
}