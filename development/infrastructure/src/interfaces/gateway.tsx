import EventDto from "../../../entities/events/event";
import EventSearchParameters from "../../../entities/events/searchParameters";
import UserSearchParameters from "../../../entities/users/searchParameters";
import UserDto from "../../../entities/users/user";

export default interface IGateway {
    login(username: string, password: string) : Promise<UserDto>;
    createUser(user: UserDto) : Promise<void>;
    getUsers(params: UserSearchParameters) : Promise<UserDto[]>;
    createEvent(params: EventDto) : Promise<void>;
    getEvents(params: EventSearchParameters) : Promise<EventDto[]>;
}