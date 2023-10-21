import { UUID } from "crypto";

export default class EventCommentDto {
    id: UUID;
    content: string;
}