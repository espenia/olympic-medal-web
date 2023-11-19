import UserSearchParameters from "../../../entities/users/searchParameters";
import UserDto from "../../../entities/users/user";

export default interface IGateway {
    login(username: string, password: string) : Promise<UserDto>;
    createUser(user: UserDto) : Promise<void>;
    getUsers(params: UserSearchParameters) : Promise<UserDto[]>;
}