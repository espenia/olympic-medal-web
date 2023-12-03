import IUseCase from "../common/interfaces/useCase"
import { Inject, Service } from "typedi";
import type IClassificationService from "../common/interfaces/classificationService";
import EventClassificationDto from "../../entities/events/classifications";

@Service('getclassificationusecase')
export default class GetClassificationUseCase implements IUseCase<EventClassificationDto[]> {
    private readonly service: IClassificationService;
    firstName? : string;
    lastName? : string;
    userId? : number;

    /**
     *
     */
    constructor(@Inject('classificationservice') service : IClassificationService) {
        this.service = service;
    }

    async handle(): Promise<EventClassificationDto[]> {
        return this.service.getClassification(this.firstName, this.lastName, this.userId);
    }
}