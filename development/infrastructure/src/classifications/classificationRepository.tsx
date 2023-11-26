import type IGateway from "../interfaces/gateway";
import IRepository from "../../../entities/common/interfaces/repository";
import Container, { Service } from "typedi";
import ApiGateway from "../gateways/gateway";
import ClassificationSearchParameters from "../../../entities/users/searchParameters";
import EventClassifications from "../../../entities/events/classifications";
import ClassificationValidateParameters from "../../../entities/events/validateParameters";

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
        return Promise.resolve();
    }

    getAsync(params: ClassificationSearchParameters): Promise<EventClassifications[]> {
        return this.gateway.getClassifications(params);
    }

    putAsync(params: ClassificationValidateParameters): Promise<void> {
        return this.gateway.acceptClassifications(params);
    }

    deleteAsync(params: ClassificationValidateParameters): Promise<void> {
        return this.gateway.declineClassifications(params);
    }
}