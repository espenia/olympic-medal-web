import EventClassificationDto from "../../../../entities/events/classifications";
import UserDto from "../../../../entities/users/user";
import { GetUsersUseCaseImpl } from "@/src/server-container";
import { GetClassificationUseCaseImpl } from "@/src/server-container";

export default async function getUser(id: number) : Promise<UserDto> {
    GetUsersUseCaseImpl.id = id;
    GetUsersUseCaseImpl.firstName = undefined;
    GetUsersUseCaseImpl.lastName = undefined;
    GetUsersUseCaseImpl.email = undefined;

    const users = await GetUsersUseCaseImpl.handle();

    return users.length > 0 ? users.at(0)! : new UserDto();
}

export async function getClassifications(athlete_id: number): Promise<EventClassificationDto[]> {
    GetClassificationUseCaseImpl.firstName = undefined;
    GetClassificationUseCaseImpl.lastName = undefined;
    GetClassificationUseCaseImpl.userId = athlete_id;

    const classifications = await GetClassificationUseCaseImpl.handle();

    return classifications;
}