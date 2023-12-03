'use server';
import { getServerSession } from 'next-auth';
import { GetClassificationUseCaseImpl, AcceptClassificationUseCaseImpl,DeclineClassificationUseCaseImpl, GetUserUseCaseImpl, GetUsersUseCaseImpl } from "@/src/server-container";
import UserDto from '../../../entities/users/user';

/*export async function getUser() {
    const user = await GetUserUseCaseImpl.handle();

    return user;
}*/

export async function getUser() {
    const session = await getServerSession();
    GetUsersUseCaseImpl.id = undefined;
    GetUsersUseCaseImpl.firstName = undefined;
    GetUsersUseCaseImpl.lastName = undefined;
    GetUsersUseCaseImpl.email = session?.user?.email ?? undefined;
  
    const users = await GetUsersUseCaseImpl.handle();
  
    return users && users.length > 0 ? users.at(0)! : new UserDto();
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