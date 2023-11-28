import type IGateway from "../interfaces/gateway";
import IRepository from "../../../entities/common/interfaces/repository";
import UserDto from "../../../entities/users/user";
import { Service } from "typedi";

@Service('userrepository')
export default class UserRepository implements IRepository<UserDto> {
    private readonly gateway : IGateway;

    /**
     *
     */
    constructor(gateway : IGateway) {
        this.gateway = gateway;
    }

    getAsync(...args: any[]): Promise<UserDto[]> {
        return this.gateway.getUsers(...args);
    }
    
    createAsync(a: UserDto): Promise<void> {
        return this.gateway.createUser(a);
    }
}