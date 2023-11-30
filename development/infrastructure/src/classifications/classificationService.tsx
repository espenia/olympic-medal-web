import type IRepository from "../../../entities/common/interfaces/repository";
import { Container, Service } from "typedi";
import IClassificationService from "../../../usecases/common/interfaces/classificationService";
import EventClassifications from "../../../entities/events/classifications";
import ClassificationRepository from "./classificationRepository";


@Service('classificationservice')
export default class ClassificationService implements IClassificationService {
    private readonly repository : IRepository<EventClassifications>;

    /**
     *
     */
    constructor(repository : IRepository<EventClassifications>) {
        this.repository = repository;
    }
    acceptClassification(firstName: string | undefined, lastName: string | undefined, id_clasificacion: number | undefined): Promise<void> {
        return this.repository.putAsync(firstName,lastName,id_clasificacion);
    }
    declineClassification(firstName: string | undefined, lastName: string | undefined, id_clasificacion: number | undefined): Promise<void> {
        return this.repository.deleteAsync(firstName,lastName,id_clasificacion);
    }

    getClassification(firstName: string | undefined, lastName: string | undefined): Promise<EventClassifications[]> {
        return this.repository.getAsync(firstName,lastName);
    }

    create(classification: EventClassifications): Promise<void> {
        return this.repository.createAsync(classification);
    }

    /*getUsers(firstName: string | undefined, lastName: string | undefined): Promise<UserDto[]> {
        const params = new UserSearchParameters();
        params.firstName = firstName;
        params.lastName = lastName;
        return this.repository.getAsync(params);
    }

    create(user: UserDto): Promise<void> {
        return this.repository.createAsync(user);
    }*/
}