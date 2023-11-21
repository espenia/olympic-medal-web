import type IRepository from "../../../entities/common/interfaces/repository";
import UserDto from "../../../entities/users/user";
import IUserService from "../../../usecases/common/interfaces/userService";
import { Container, Service } from "typedi";
import UserRepository from "./userRepository";

@Service('userservice')
export default class UserService implements IUserService {
    private readonly repository : UserRepository<UserDto> = Container.get<UserRepository<UserDto>>('userrepository');

    /**
     *
     */
    constructor() {
        UserRepository;
    }

    create(user: UserDto): Promise<void> {
        return this.repository.createAsync(user);
    }

    changePassword(email: string, userName: string, password: string): Promise<void> {
        return this.repository.changePassword(email, userName, password);
    }
}