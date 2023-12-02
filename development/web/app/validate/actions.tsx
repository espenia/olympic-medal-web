'use server';
import { GetClassificationUseCaseImpl, AcceptClassificationUseCaseImpl,DeclineClassificationUseCaseImpl, GetUserUseCaseImpl } from "@/src/server-container";

export async function getUser() {
    const user = await GetUserUseCaseImpl.handle();

    return user;
}

export async function getClassification(firstName: string | undefined, lastName: string | undefined) {
    GetClassificationUseCaseImpl.firstName = firstName;
    GetClassificationUseCaseImpl.lastName = lastName;

    const users = await GetClassificationUseCaseImpl.handle();

    return users;
}

export async function acceptClassification(id_clasificacion: number | undefined) {
    AcceptClassificationUseCaseImpl.id_classification = id_clasificacion;

    const users = await AcceptClassificationUseCaseImpl.handle();
    return;
}

export async function declineClassification(id_clasificacion: number | undefined) {
    DeclineClassificationUseCaseImpl.id_classification = id_clasificacion;

    const users = await DeclineClassificationUseCaseImpl.handle();

    return ;
}