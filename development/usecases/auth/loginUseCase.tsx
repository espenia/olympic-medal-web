import type IAuthService from "../common/interfaces/authService";
import IUseCase from "../common/interfaces/useCase";
import UserDto from "../../entities/users/user";
import { Inject, Service } from "typedi";

@Service('loginusecase')
export default class LoginUseCase implements IUseCase<UserDto> {
    username?: string;
    password?: string;

    private readonly service : IAuthService;
    /**
     *
     */
    constructor(@Inject('authservice') service : IAuthService) {
        this.service = service;
    }

    handle(): Promise<UserDto> {
        return this.service.login(this.username ?? "", this.password ?? "");
    }
}