import EventClassificationDto from "../../../../entities/events/classifications";
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

export async function getClassifications(athlete_id: number): Promise<EventClassificationDto[]> {
    const classif1 = new EventClassificationDto();
    classif1.id = 1;
    classif1.event_id = 1;
    classif1.position = 1;
    classif1.duration_hours = 1;
    classif1.duration_minutes = 1;
    classif1.duration_seconds = 1;
    classif1.athlete_first_name = "fer";
    classif1.athlete_last_name = "fer";

    const classif2 = new EventClassificationDto();
    classif2.id = 2;
    classif2.event_id = 2;
    classif2.position = 2;
    classif2.duration_hours = 2;
    classif2.duration_minutes = 2;
    classif2.duration_seconds = 2;
    classif2.athlete_first_name = "fer";
    classif2.athlete_last_name = "fer";

    const classifications = [classif1, classif2];
    
    return new Promise<EventClassificationDto[]>(resolve => resolve(classifications));
}