
import EventClassifications from "../../../entities/events/classifications";
import UserDto from "../../../entities/users/user";
import EventDto from "../../../entities/events/event";
import EventClassificationDto from "../../../entities/events/classifications";

export default interface IGateway {
    getClassifications(...args: any[]): Promise<EventClassifications[]>;
    login(username: string, password: string) : Promise<UserDto>;
    createUser(user: UserDto) : Promise<void>;
    recoverPassword(mail: string, recoverUrl: string): Promise<void>;
    changePassword(mail: string, userName: string, password: string): Promise<void>;
    acceptClassifications(idClassification: string): Promise<void>
    declineClassifications(idClassification: string): Promise<void>
    createEvent(params: EventDto) : Promise<void>;
    getEvents(...args: any[]) : Promise<EventDto[]>;
    getUsers(...args: any[]) : Promise<UserDto[]>;
    getUser(...args: any[]): Promise<UserDto>;
    getEvents(...args: any[]) : Promise<EventDto[]>;
    createEvent(event: EventDto) : Promise<void>;
    getClassificationsById(athlete_id: number): Promise<EventClassificationDto[]>
}