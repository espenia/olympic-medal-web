import UserDto from "../../../../entities/users/user";
import { GetUsersUseCaseImpl } from "@/src/server-container";

export default async function getUser(id: number) : Promise<UserDto> {
    GetUsersUseCaseImpl.id = id;
    GetUsersUseCaseImpl.firstName = undefined;
    GetUsersUseCaseImpl.lastName = undefined;
    GetUsersUseCaseImpl.email = undefined;

    const users = await GetUsersUseCaseImpl.handle();

    return users.length > 0 ? users.at(0)! : new UserDto();
}