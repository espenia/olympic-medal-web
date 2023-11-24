import type IGateway from "../interfaces/gateway";
import IRepository from "../../../entities/common/interfaces/repository";
import UserDto from "../../../entities/users/user";
import Container, { Service } from "typedi";
import ApiGateway from "../gateways/gateway";
import ClassificationSearchParameters from "../../../entities/users/searchParameters";
import EventClassifications from "../../../entities/events/classifications";

@Service('classificationrepository')
export default class ClassificationRepository implements IRepository<EventClassifications> {
    private readonly gateway : IGateway = Container.get<IGateway>('apigateway');

    /**
     *
     */
    constructor() {
        ApiGateway;
    }
    createAsync(a: EventClassifications): Promise<void> {
        throw new Error("Method not implemented.");
    }

    getAsync(params: ClassificationSearchParameters): Promise<UserDto[]> {
        return this.gateway.getClassifications(params);
    }
}