import ClassificationValidateParameters from "../../../entities/events/validateParameters";
import ClassificationSearchParameters from "../../../entities/events/searchParameters";
import EventClassifications from "../../../entities/events/classifications";
import UserDto from "../../../entities/users/user";

export default interface IGateway {
    getClassifications(params: ClassificationSearchParameters): Promise<EventClassifications[]>;
    login(username: string, password: string) : Promise<UserDto>;
    createUser(user: UserDto) : Promise<void>;
    recoverPassword(mail: string, recoverUrl: string): Promise<void>;
    changePassword(mail: string, userName: string, password: string): Promise<void>;
    acceptClassifications(params: ClassificationValidateParameters): Promise<void>;
    declineClassifications(params: ClassificationValidateParameters): Promise<void>;
    createEvent(params: EventDto) : Promise<void>;
    getEvents(...args: any[]) : Promise<EventDto[]>;
    getUsers(...args: any[]) : Promise<UserDto[]>;
    getEvents(...args: any[]) : Promise<EventDto[]>;
    createEvent(event: EventDto) : Promise<void>;
}