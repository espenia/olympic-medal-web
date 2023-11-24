import { GetClassificationUseCaseImpl } from "@/src/server-container";

export async function getClassification(firstName: string | undefined, lastName: string | undefined) {
    GetClassificationUseCaseImpl.firstName = firstName;
    GetClassificationUseCaseImpl.lastName = lastName;
    GetClassificationUseCaseImpl.id = undefined;

    const users = await GetClassificationUseCaseImpl.handle();

    return users;
}