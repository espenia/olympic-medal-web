'use server';

import { GetUsersUseCaseImpl } from "@/src/server-container";
import { redirect } from "next/navigation";

export async function getUsers(firstName: string | undefined, lastName: string | undefined) {
    GetUsersUseCaseImpl.firstName = !isStringNullEmptyOrWhitespace(firstName) ? firstName : undefined;
    GetUsersUseCaseImpl.lastName = !isStringNullEmptyOrWhitespace(lastName) ? lastName : undefined;;
    GetUsersUseCaseImpl.id = undefined;

    const users = await GetUsersUseCaseImpl.handle();

    return users;
}

export async function filter(formData: FormData) {
    const params = new URLSearchParams();
    params.set('first_name', formData.get('first_name')?.toString() ?? "");
    params.set('last_name', formData.get('last_name')?.toString() ?? "");
    return redirect(`/athletes?` + params);
  }

function isStringNullEmptyOrWhitespace(str: string | null | undefined) {
    return !str || str === null || str.trim().length === 0;
}