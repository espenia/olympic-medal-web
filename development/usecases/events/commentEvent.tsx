import IUseCase from "../common/interfaces/useCase";
import type IEventService from "../common/interfaces/eventService";
import EventCommentDto from "../../entities/events/comment";
import { Inject, Service } from "typedi";

@Service('commenteventusecase')
export default class CommentEventUseCase implements IUseCase<void> {
    private readonly service : IEventService;
    comment? : EventCommentDto;

    /**
     *
     */
    constructor(@Inject('eventservice') service : IEventService) {
        this.service = service;
    }

    handle(): Promise<void> {
        return this.service.commentEventAsync(this.comment!);
    }

}