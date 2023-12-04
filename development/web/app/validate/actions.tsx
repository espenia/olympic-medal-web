'use server';
import { GetClassificationUseCaseImpl, AcceptClassificationUseCaseImpl, GetUserUseCaseImpl } from "@/src/server-container";
import {redirect} from "next/navigation";

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
    return redirect('/validate');
}

// export async function declineClassification(id_clasificacion: number | undefined) {
//     DeclineClassificationUseCaseImpl.id_classification = id_clasificacion;
//
//     const users = await DeclineClassificationUseCaseImpl.handle();
//     return redirect('/validate');
// }