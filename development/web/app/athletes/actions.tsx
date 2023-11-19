import { GetUsersUseCaseImpl } from "@/src/server-container";

export async function getUsers(firstName: string | undefined, lastName: string | undefined) {
    GetUsersUseCaseImpl.firstName = firstName;
    GetUsersUseCaseImpl.lastName = lastName;
    GetUsersUseCaseImpl.id = undefined;

    const users = await GetUsersUseCaseImpl.handle();

    return users;
}