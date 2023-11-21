import UserDto from "../../../entities/users/user";

export default interface IUserService {
    create(user: UserDto) : Promise<void>;
    getUsers(firstName: string | undefined, lastName: string | undefined) : Promise<UserDto[]>;
    changePassword(email: string, userName: string, password: string): Promise<void>;

}