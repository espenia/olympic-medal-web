import { GetClassificationUseCaseImpl, AcceptClassificationUseCaseImpl } from "@/src/server-container";

export async function getClassification(firstName: string | undefined, lastName: string | undefined) {
    GetClassificationUseCaseImpl.firstName = firstName;
    GetClassificationUseCaseImpl.lastName = lastName;
    GetClassificationUseCaseImpl.id = undefined;

    const users = await GetClassificationUseCaseImpl.handle();

    return users;
}

export async function acceptClassification(firstName: string | undefined, lastName: string | undefined,id_clasificacion: number) {
    GetClassificationUseCaseImpl.firstName = firstName;
    GetClassificationUseCaseImpl.lastName = lastName;
    GetClassificationUseCaseImpl.id = id_clasificacion;

    const users = await GetClassificationUseCaseImpl.handle();

    return;
}

export async function declineClassification(firstName: string | undefined, lastName: string | undefined,id_clasificacion: number) {
    GetClassificationUseCaseImpl.firstName = firstName;
    GetClassificationUseCaseImpl.lastName = lastName;
    GetClassificationUseCaseImpl.id = id_clasificacion;

    const users = await GetClassificationUseCaseImpl.handle();

    return ;
}