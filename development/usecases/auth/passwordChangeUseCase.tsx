import IUseCase from "../common/interfaces/useCase";
import { Inject, Service } from "typedi";
import type IUserService from "../common/interfaces/userService";

@Service('passwordchangeusecase')
export default class PasswordChangeUseCase implements IUseCase<void> {
    mail?: string;
    password?: string;
    userName?: string;

    private readonly service : IUserService;
    /**
     *
     */
    constructor(@Inject('userservice') service : IUserService) {
        this.service = service;
    }

    handle(): Promise<void> {
        return this.service.changePassword(this.mail!, this.userName!, this.password!);
    }
}