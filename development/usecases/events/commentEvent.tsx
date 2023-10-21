import IUseCase from "../common/interfaces/useCase";
import IEventService from "../common/interfaces/eventService";
import { UUID } from "crypto";

export default class CommentEventUseCase implements IUseCase<void> {
    private readonly service : IEventService;
    comment : string;
    eventId : UUID

    /**
     *
     */
    constructor(service : IEventService) {
        this.service = service;
    }

    handle(): Promise<void> {
        return this.service.commentEventAsync(this.eventId, this.comment);
    }

}