import UserDto from "../../entities/users/user";
import IUseCase from "../common/interfaces/useCase";
import type IUserService from "../common/interfaces/userService";
import { Inject, Service } from "typedi";

@Service('registrationusecase')
export default class RegistrationUseCase implements IUseCase<void> {
    user?: UserDto;
    private readonly service : IUserService;

    /**
     *
     */
    constructor(@Inject('userservice') service: IUserService) {
        this.service = service;
    }
    
    handle(): Promise<void> {
        return this.service.create(this.user!);
    }
}