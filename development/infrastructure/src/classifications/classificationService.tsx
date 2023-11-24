import type IRepository from "../../../entities/common/interfaces/repository";
import UserDto from "../../../entities/users/user";
import IUserService from "../../../usecases/common/interfaces/userService";
import { Container, Service } from "typedi";
import UserSearchParameters from "../../../entities/users/searchParameters";
import IClassificationService from "../../../usecases/common/interfaces/classificationService";
import EventClassifications from "../../../entities/events/classifications";
import ClassificationRepository from "./classificationRepository";
import ClassificationSearchParameters from "../../../entities/events/searchParameters";

@Service('classificationservice')
export default class ClassificationService implements IClassificationService {
    private readonly repository : IRepository<EventClassifications> = Container.get<IRepository<EventClassifications>>('classificationrepository');

    /**
     *
     */
    constructor() {
        ClassificationRepository;
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