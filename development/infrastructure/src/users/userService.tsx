import type IRepository from "../../../entities/common/interfaces/repository";
import UserDto from "../../../entities/users/user";
import IUserService from "../../../usecases/common/interfaces/userService";
import { Service } from "typedi";

@Service('userservice')
export default class UserService implements IUserService {
    private readonly repository : IRepository<UserDto>;

    /**
     *
     */
    constructor(repository : IRepository<UserDto>) {
        this.repository = repository;
    }

    getUsers(id: number | undefined, firstName: string | undefined, lastName: string | undefined): Promise<UserDto[]> {
        return this.repository.getAsync(id, firstName, lastName);
    }

    create(user: UserDto): Promise<void> {
        return this.repository.createAsync(user);
    }
}