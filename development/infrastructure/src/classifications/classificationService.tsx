import type IRepository from "../../../entities/common/interfaces/repository";
import { Container, Service } from "typedi";
import IClassificationService from "../../../usecases/common/interfaces/classificationService";
import EventClassifications from "../../../entities/events/classifications";
import ClassificationRepository from "./classificationRepository";
import ClassificationSearchParameters from "../../../entities/events/searchParameters";
import ClassificationValidateParameters from "../../../entities/events/validateParameters";

@Service('classificationservice')
export default class ClassificationService implements IClassificationService {
    private readonly repository : IRepository<EventClassifications> = Container.get<IRepository<EventClassifications>>('classificationrepository');

    /**
     *
     */
    constructor() {
        ClassificationRepository;
    }
    acceptClassification(firstName: string | undefined, lastName: string | undefined, id_clasificacion: number | undefined): Promise<void> {
        const params = new ClassificationValidateParameters();
        params.firstName = firstName;
        params.lastName = lastName;
        params.idClassification = id_clasificacion;
        return this.repository.putAsync(params);
    }
    declineClassification(firstName: string | undefined, lastName: string | undefined, id_clasificacion: number | undefined): Promise<void> {
        const params = new ClassificationValidateParameters();
        params.firstName = firstName;
        params.lastName = lastName;
        params.idClassification = id_clasificacion;
        return this.repository.deleteAsync(params);
    }

    getClassification(firstName: string | undefined, lastName: string | undefined): Promise<EventClassifications[]> {
        const params = new ClassificationSearchParameters();
        params.firstName = firstName;
        params.lastName = lastName;
        return this.repository.getAsync(params);
    }

    

    create(event: EventClassifications): Promise<void> {
        return this.repository.createAsync(event);
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