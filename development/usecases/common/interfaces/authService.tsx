import UserDto from "../../../entities/users/user";

export default interface IAuthService {
    changePassword(email: string, password: string): Promise<void>;
    login(username: string, password: string) : Promise<UserDto>;
    recoverPassword(mail: string, recoverUrl: string): Promise<void>;
}