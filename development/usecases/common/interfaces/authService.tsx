import UserDto from "../../../entities/users/user";

export default interface IAuthService {
    login(username: string, password: string) : Promise<UserDto>;
    recoverPassword(mail: string, recoverUrl: string): Promise<void>;
}