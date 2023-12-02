import type IGateway from "../interfaces/gateway";
import IRepository from "../../../entities/common/interfaces/repository";
import { Service } from "typedi";
import EventClassifications from "../../../entities/events/classifications";

@Service('classificationrepository')
export default class ClassificationRepository implements IRepository<EventClassifications> {
    private readonly gateway : IGateway;

    /**
     *
     */
    constructor(gateway : IGateway) {
        this.gateway = gateway;
    }
    
    getOneAsync(...args: any[]): Promise<EventClassifications> {
        throw new Error("Method not implemented.");
    }

    createAsync(a: EventClassifications): Promise<void> {
        return Promise.resolve();
    }

    getAsync(...args: any[]): Promise<EventClassifications[]> {
        return this.gateway.getClassifications(...args);
    }

    putAsync(...args: any[]): Promise<void> {
        return this.gateway.acceptClassifications(args[0]);
    }

    deleteAsync(...args: any[]): Promise<void> {
        return this.gateway.declineClassifications(args[0]);
    }
}