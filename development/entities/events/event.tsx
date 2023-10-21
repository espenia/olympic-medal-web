import { UUID } from "crypto";
import EventCommentDto from "./comment";

export default class EventDto {
    id : UUID;
    name : string;
    comments : EventCommentDto[]

    /**
     *
     */
    constructor() {
        this.comments = [];
    }
}