import EventClassifications from "../../../entities/events/classifications";

export default interface IClassificationService {
    create(classification: EventClassifications) : Promise<void>;
    getClassification(firstName: string | undefined, lastName: string | undefined) : Promise<EventClassifications[]>;
    acceptClassification(firstName: string | undefined, lastName: string | undefined, id_clasificacion: number | undefined) : Promise<void>;
    declineClassification(firstName: string | undefined, lastName: string | undefined, id_clasificacion: number | undefined) : Promise<void>;
}