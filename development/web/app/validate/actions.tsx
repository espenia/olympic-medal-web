'use server';
import { GetClassificationUseCaseImpl, AcceptClassificationUseCaseImpl,DeclineClassificationUseCaseImpl, GetUserUseCaseImpl } from "@/src/server-container";

export async function getUser() {
    const user = await GetUserUseCaseImpl.handle();

    return user;
}

export async function getClassification(firstName: string | undefined, lastName: string | undefined) {
    GetClassificationUseCaseImpl.firstName = firstName;
    GetClassificationUseCaseImpl.lastName = lastName;
    GetClassificationUseCaseImpl.id = undefined;

    const users = await GetClassificationUseCaseImpl.handle();

    return users;
}

export async function acceptClassification(firstName: string | undefined, lastName: string | undefined,id_clasificacion: number | undefined) {
    AcceptClassificationUseCaseImpl.firstName = firstName;
    AcceptClassificationUseCaseImpl.lastName = lastName;
    AcceptClassificationUseCaseImpl.id = id_clasificacion;

    const users = await AcceptClassificationUseCaseImpl.handle();

    return;
}

export async function declineClassification(firstName: string | undefined, lastName: string | undefined,id_clasificacion: number | undefined) {
    DeclineClassificationUseCaseImpl.firstName = firstName;
    DeclineClassificationUseCaseImpl.lastName = lastName;
    DeclineClassificationUseCaseImpl.id = id_clasificacion;

    const users = await DeclineClassificationUseCaseImpl.handle();

    return ;
}