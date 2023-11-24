import EventCommentDto from "./comment";
import EventClassificationDto from "./classifications";

export default class EventDto {
    id?: number | undefined;
    name? : string;
    description?: string;
    sportType?: string;
    country?: string;
    state?: string;
    dateTo?: string;
    dateFrom?: string;
    edition?: number;
    athleteFirstName?: string;
    athleteLastName?: string;
    athleteCountry?: string;
    classification?: EventClassificationDto[];

    comments?: EventCommentDto[];

    /**
     *
     */
    constructor(id: number | undefined = undefined, name: string | undefined = undefined, description: string | undefined = undefined,
                sportType: string | undefined = undefined, country: string | undefined = undefined, state: string | undefined = undefined,
                dateFrom: string | undefined = undefined, dateTo: string | undefined = undefined, comments: EventCommentDto[] | undefined = undefined,
                edition: number | undefined = undefined, athleteFirstName: string | undefined = undefined, athleteLastName: string | undefined = undefined,
                athleteCountry: string | undefined = undefined, classification: EventClassificationDto[] | [] = [] ) {
        this.id = id;
        this.name = name;
        this.comments = comments ?? [];
        this.description = description;
        this.sportType = sportType;
        this.country = country;
        this.state = state;
        this.edition = edition;
        this.athleteFirstName = athleteLastName;
        this.athleteLastName = athleteLastName;
        this.athleteCountry = athleteCountry;
        this.dateTo = dateTo;
        this.dateFrom = dateFrom;
        this.classification = classification;
    }
}