import IUseCase from "../common/interfaces/useCase"
import UserDto from "../../entities/users/user";
import type IUserService from "../common/interfaces/userService";
import { Inject, Service } from "typedi";

@Service('getuserusecase')
export default class GetUsersUseCase implements IUseCase<UserDto> {
    private readonly service: IUserService;
    /**
     *
     */
    constructor(@Inject('userservice') service : IUserService) {
        this.service = service;
    }

    handle(): Promise<UserDto> {
        return this.service.getUser();
    }
}