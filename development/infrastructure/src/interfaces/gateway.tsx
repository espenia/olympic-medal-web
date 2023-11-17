import UserDto from "../../../entities/users/user";

export default interface IGateway {
    changePassword(email: string): Promise<void>;
    login(username: string, password: string) : Promise<UserDto>;
    createUser(user: UserDto) : Promise<void>;
}