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
    getOneAsync(...args: any[]): Promise<UserDto> {
        return this.gateway.getUser();
    }
    deleteAsync(...args: any[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    putAsync(...args: any[]): Promise<void> {
        throw new Error("Method not implemented.");
    }

    getAsync(...args: any[]): Promise<UserDto[]> {
        return this.gateway.getUsers(...args);
    }
    
    createAsync(a: UserDto): Promise<void> {
        return this.gateway.createUser(a);
    }
}