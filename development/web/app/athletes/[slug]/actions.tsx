import { UUID } from "crypto";
import UserDto from "../../../../entities/users/user";
import { GetUsersUseCaseImpl } from "@/src/server-container";

export default async function getUser(id: UUID) : Promise<UserDto> {
    GetUsersUseCaseImpl.id = id;
    GetUsersUseCaseImpl.firstName = undefined;
    GetUsersUseCaseImpl.lastName = undefined;

    const user = await GetUsersUseCaseImpl.handle();

    return user.at(0)!;
}