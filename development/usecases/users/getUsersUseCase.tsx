import IUseCase from "../common/interfaces/useCase"
import UserDto from "../../entities/users/user";
import type IUserService from "../common/interfaces/userService";
import { Inject, Service } from "typedi";

@Service('getusersusecase')
export default class GetUsersUseCase implements IUseCase<UserDto[]> {
    private readonly service: IUserService;
    firstName? : string;
    lastName? : string;
    id?: number;

    /**
     *
     */
    constructor(@Inject('userservice') service : IUserService) {
        this.service = service;
    }

    handle(): Promise<UserDto[]> {
        return this.service.getUsers(this.id, this.firstName, this.lastName);
    }
}