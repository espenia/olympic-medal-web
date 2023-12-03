import type IGateway from "../interfaces/gateway";
import IRepository from "../../../entities/common/interfaces/repository";
import { Service } from "typedi";
import EventClassificationDto from "../../../entities/events/classifications";

@Service('classificationrepository')
export default class ClassificationRepository implements IRepository<EventClassificationDto> {
    private readonly gateway : IGateway;

    /**
     *
     */
    constructor(gateway : IGateway) {
        this.gateway = gateway;
    }
    
    getOneAsync(...args: any[]): Promise<EventClassificationDto> {
        throw new Error("Method not implemented.");
    }

    createAsync(a: EventClassificationDto): Promise<void> {
        return Promise.resolve();
    }

    getAsync(...args: any[]): Promise<EventClassificationDto[]> {
        return this.gateway.getClassifications(...args);
    }

    putAsync(...args: any[]): Promise<void> {
        return this.gateway.acceptClassifications(args[0]);
    }

    deleteAsync(...args: any[]): Promise<void> {
        return this.gateway.declineClassifications(args[0]);
    }
}