import type IAuthService from "../common/interfaces/authService";
import IUseCase from "../common/interfaces/useCase";
import { Inject, Service } from "typedi";

@Service('passwordrecoverusecase')
export default class PasswordRecoverUseCase implements IUseCase<void> {
    mail?: string;
    recoverUrl?: string;

    private readonly service : IAuthService;
    /**
     *
     */
    constructor(@Inject('authservice') service : IAuthService) {
        this.service = service;
    }

    handle(): Promise<void> {
        return this.service.recoverPassword(this.mail!, this.recoverUrl!);
    }
}