import IUseCase from "../common/interfaces/useCase"
import { Inject, Service } from "typedi";
import type IClassificationService from "../common/interfaces/classificationService";

@Service('acceptclassificationusecase')
export default class AcceptClassificationUseCase implements IUseCase<void> {
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
        return this.service.acceptClassification(this.firstName, this.lastName, this.id_classification);
    }
}