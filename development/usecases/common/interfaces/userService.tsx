import UserDto from "../../../entities/users/user";

export default interface IUserService {
    getUser(): Promise<UserDto>;
    create(user: UserDto) : Promise<void>;
    getUsers(id: number | undefined, firstName: string | undefined, lastName: string | undefined, email: string | undefined) : Promise<UserDto[]>;
}