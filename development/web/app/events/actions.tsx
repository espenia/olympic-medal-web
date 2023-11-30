'use server';

import { redirect } from "next/navigation";
import { GetEventUseCaseImpl } from "../../src/server-container"

export async function getEvents(name: string | undefined, 
                                category: string | undefined, 
                                location: string | undefined, 
                                edition: string | undefined, 
                                dateFrom: string | undefined, 
                                dateTo: string | undefined, 
                                athleteFirstName: string | undefined, 
                                athleteLastName: string | undefined, 
                                athleteCountry: string | undefined
                                ) {
    GetEventUseCaseImpl.name = name;
    GetEventUseCaseImpl.category = category;
    GetEventUseCaseImpl.location = location;
    GetEventUseCaseImpl.edition = edition;
    GetEventUseCaseImpl.dateFrom = !isStringNullEmptyOrWhitespace(dateFrom) ? new Date(dateFrom!) : undefined;
    GetEventUseCaseImpl.dateTo = !isStringNullEmptyOrWhitespace(dateTo) ? new Date(dateTo!) : undefined;
    GetEventUseCaseImpl.athleteFirstName = athleteFirstName;
    GetEventUseCaseImpl.athleteLastName = athleteLastName;
    GetEventUseCaseImpl.athleteCountry = athleteCountry;
    GetEventUseCaseImpl.id = undefined;
    const events = await GetEventUseCaseImpl.handle();

    return events;
}

export async function filter(formData: FormData) {
    const params = new URLSearchParams();
    params.set('name', formData.get('name')?.toString() ?? "");
    params.set('category', formData.get('category')?.toString() ?? "");
    params.set('location', formData.get('location')?.toString() ?? "");
    params.set('edition', formData.get('edition')?.toString() ?? "");
    params.set('date_from', formData.get('date_from')?.toString() ?? "");
    params.set('date_to', formData.get('date_to')?.toString() ?? "");
    params.set('athlete_first_name', formData.get('athlete_first_name')?.toString() ?? "");
    params.set('athlete_last_name', formData.get('athlete_last_name')?.toString() ?? "");
    params.set('athlete_country', formData.get('athlete_country')?.toString() ?? "");
return redirect(`/events?` + params);
}

function isStringNullEmptyOrWhitespace(str: string | null | undefined) {
    return !str || str === null || str.trim().length === 0;
}