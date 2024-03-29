import IUseCase from "../common/interfaces/useCase";
import { Inject, Service } from "typedi";
import type IAuthService from "../common/interfaces/authService";

@Service('passwordchangeusecase')
export default class PasswordChangeUseCase implements IUseCase<void> {
    mail?: string;
    password?: string;

    private readonly service : IAuthService;
    /**
     *
     */
    constructor(@Inject('authservice') service : IAuthService) {
        this.service = service;
    }

    handle(): Promise<void> {
        return this.service.changePassword(this.mail!, this.password!);
    }
}