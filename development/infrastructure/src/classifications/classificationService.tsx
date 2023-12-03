import type IRepository from "../../../entities/common/interfaces/repository";
import { Service } from "typedi";
import IClassificationService from "../../../usecases/common/interfaces/classificationService";
import EventClassificationDto from "../../../entities/events/classifications";


@Service('classificationservice')
export default class ClassificationService implements IClassificationService {
    private readonly repository : IRepository<EventClassificationDto>;

    /**
     *
     */
    constructor(repository : IRepository<EventClassificationDto>) {
        this.repository = repository;
    }
    acceptClassification(id_clasificacion: number | undefined): Promise<void> {
        return this.repository.putAsync(id_clasificacion);
    }
    declineClassification(id_clasificacion: number | undefined): Promise<void> {
        return this.repository.deleteAsync(id_clasificacion);
    }

    getClassification(firstName: string | undefined, lastName: string | undefined, userId : number | undefined): Promise<EventClassificationDto[]> {
        return this.repository.getAsync(firstName,lastName, userId);
    }

    create(classification: EventClassificationDto): Promise<void> {
        return this.repository.createAsync(classification);
    }
}