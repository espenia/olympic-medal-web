import IUseCase from "../common/interfaces/useCase"
import { Inject, Service } from "typedi";
import type IClassificationService from "../common/interfaces/classificationService";

@Service('acceptclassificationusecase')
export default class AcceptClassificationUseCase implements IUseCase<void> {
    private readonly service: IClassificationService;
    id_classification?: number;

    /**
     *
     */
    constructor(@Inject('classificationservice') service : IClassificationService) {
        this.service = service;
    }

    handle(): Promise<void> {
        return this.service.acceptClassification(this.id_classification);
    }
}