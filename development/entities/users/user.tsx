import { UUID } from "crypto";

export default class UserDto {
    id?: UUID;
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
    email?: string;
    birthdate?: Date;
    isProfilePublic?: boolean;
    goldMedals?: number;
    silverMedals?: number;
    bronzeMedals?: number;
}