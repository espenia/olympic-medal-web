import type IGateway from "../interfaces/gateway";
import IRepository from "../../../entities/common/interfaces/repository";
import UserDto from "../../../entities/users/user";
import Container, { Service } from "typedi";
import ApiGateway from "../gateways/gateway";

@Service('userrepository')
export default class UserRepository implements IRepository<UserDto> {
    private readonly gateway : IGateway = Container.get<IGateway>('apigateway');

    /**
     *
     */
    constructor() {
        ApiGateway;
    }

    getAsync(...params: unknown[]): Promise<UserDto[]> {
        throw new Error("Method not implemented.");
    }
    
    createAsync(a: UserDto): Promise<void> {
        return this.gateway.createUser(a);
    }

    changePassword(email: string, userName: string, password: string): Promise<void> {
        return this.gateway.changePassword(email, userName, password);
    }

}