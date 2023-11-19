import UserDto from "../../../entities/users/user";

export default interface IUserService {
    create(user: UserDto) : Promise<void>;

}