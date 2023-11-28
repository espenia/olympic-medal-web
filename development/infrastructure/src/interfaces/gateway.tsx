import EventDto from "../../../entities/events/event";
import UserDto from "../../../entities/users/user";

export default interface IGateway {
    login(username: string, password: string) : Promise<UserDto>;
    createUser(user: UserDto) : Promise<void>;
    recoverPassword(mail: string, recoverUrl: string): Promise<void>;
    changePassword(mail: string, userName: string, password: string): Promise<void>;
    createEvent(params: EventDto) : Promise<void>;
    getEvents(params: EventSearchParameters) : Promise<EventDto[]>;
    getUsers(...args: any[]) : Promise<UserDto[]>;
}