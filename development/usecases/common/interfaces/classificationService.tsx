import EventClassificationDto from "../../../entities/events/classifications";

export default interface IClassificationService {
    create(classification: EventClassificationDto) : Promise<void>;
    getClassification(firstName: string | undefined, lastName: string | undefined, userId: number | undefined) : Promise<EventClassificationDto[]>;
    acceptClassification(id_clasificacion: number | undefined) : Promise<void>;
    declineClassification(id_clasificacion: number | undefined) : Promise<void>;
}