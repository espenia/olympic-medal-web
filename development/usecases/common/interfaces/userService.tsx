import UserDto from "../../../entities/users/user";

export default interface IUserService {
    create(user: UserDto) : Promise<void>;
    changePassword(email: string, userName: string, password: string): Promise<void>;

}