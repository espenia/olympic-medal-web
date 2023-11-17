import UserDto from "../../../entities/users/user";

export default interface IAuthService {
    login(username: string, password: string) : Promise<UserDto>;
    changePassword(email: string) : Promise<UserDto>;
}