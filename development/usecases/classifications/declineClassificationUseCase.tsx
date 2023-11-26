import IUseCase from "../common/interfaces/useCase"
import { Inject, Service } from "typedi";
import EventClassifications from "../../entities/events/classifications";
import type IClassificationService from "../common/interfaces/classificationService";

@Service('declineclassificationusecase')
export default class GetClassificationUseCase implements IUseCase<EventClassifications[]> {
    private readonly service: IClassificationService;
    firstName? : string;
    lastName? : string;
    id_classification?: number;
    id?: number;

    /**
     *
     */
    constructor(@Inject('classificationservice') service : IClassificationService) {
        this.service = service;
    }

    handle(): Promise<void> {
        return this.service.declineClassification(this.firstName, this.lastName, this.id_classification);
    }
}