import UserDto from "../../../entities/users/user";

export default interface IUserService {
    create(user: UserDto) : Promise<void>;
    getUsers(id: number | undefined, firstName: string | undefined, lastName: string | undefined) : Promise<UserDto[]>;
}