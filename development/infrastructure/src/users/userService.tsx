import type IRepository from "../../../entities/common/interfaces/repository";
import UserDto from "../../../entities/users/user";
import IUserService from "../../../usecases/common/interfaces/userService";
import { Container, Service } from "typedi";
import UserRepository from "./userRepository";
import UserSearchParameters from "../../../entities/users/searchParameters";

@Service('userservice')
export default class UserService implements IUserService {
    private readonly repository : IRepository<UserDto> = Container.get<IRepository<UserDto>>('userrepository');

    /**
     *
     */
    constructor() {
        UserRepository;
    }

    getUsers(firstName: string | undefined, lastName: string | undefined): Promise<UserDto[]> {
        const params = new UserSearchParameters();
        params.firstName = firstName;
        params.lastName = lastName;
        return this.repository.getAsync(params);
    }

    create(user: UserDto): Promise<void> {
        return this.repository.createAsync(user);
    }
}