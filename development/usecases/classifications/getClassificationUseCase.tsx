import IUseCase from "../common/interfaces/useCase"
import { Inject, Service } from "typedi";
import EventClassifications from "../../entities/events/classifications";
import type IClassificationService from "@/common/interfaces/classificationService";

@Service('getclassificationusecase')
export default class GetClassificationUseCase implements IUseCase<EventClassifications[]> {
    private readonly service: IClassificationService;
    firstName? : string;
    lastName? : string;
    id?: number;

    /**
     *
     */
    constructor(@Inject('classificationservice') service : IClassificationService) {
        this.service = service;
    }

    handle(): Promise<EventClassifications[]> {
        return this.service.getClassification(this.firstName, this.lastName);
    }
}