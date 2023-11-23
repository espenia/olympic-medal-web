import type IGateway from "../interfaces/gateway";
import IRepository from "../../../entities/common/interfaces/repository";
import UserDto from "../../../entities/users/user";
import Container, { Service } from "typedi";
import ApiGateway from "../gateways/gateway";
import UserSearchParameters from "../../../entities/users/searchParameters";

@Service('userrepository')
export default class UserRepository implements IRepository<UserDto> {
    private readonly gateway : IGateway = Container.get<IGateway>('apigateway');

    /**
     *
     */
    constructor() {
        ApiGateway;
    }

    getAsync(params: UserSearchParameters): Promise<UserDto[]> {
        return this.gateway.getUsers(params);
    }
    
    createAsync(a: UserDto): Promise<void> {
        return this.gateway.createUser(a);
    }
}