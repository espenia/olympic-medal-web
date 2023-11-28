import { Service } from 'typedi';
import UserDto from "../../../entities/users/user";
import IAuthService from "../../../usecases/common/interfaces/authService";
import type IGateway from "../interfaces/gateway";


@Service('authservice')
export default class AuthService implements IAuthService {
    private readonly gateway : IGateway;

    /**
     *
     */
    constructor(gateway : IGateway) {
        this.gateway = gateway;
    }

    login(username: string, password: string): Promise<UserDto> {
        return this.gateway.login(username, password);
    }

    recoverPassword(mail: string, recoverUrl: string): Promise<void> {
        return this.gateway.recoverPassword(mail, recoverUrl);
    }

    changePassword(email: string, userName: string, password: string): Promise<void> {
        return this.gateway.changePassword(email, userName, password);
    }
}