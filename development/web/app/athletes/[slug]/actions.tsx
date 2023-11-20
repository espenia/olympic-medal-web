import { UUID } from "crypto";
import UserDto from "../../../../entities/users/user";
import { GetUsersUseCaseImpl } from "@/src/server-container";

export default async function getUser(id: UUID) : Promise<UserDto> {
    GetUsersUseCaseImpl.id = id;
    GetUsersUseCaseImpl.firstName = undefined;
    GetUsersUseCaseImpl.lastName = undefined;

    const users = await GetUsersUseCaseImpl.handle();

    return users.length > 0 ? users.at(0)! : new UserDto();
}