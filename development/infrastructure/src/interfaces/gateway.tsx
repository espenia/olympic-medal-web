import EventClassifications from "../../../entities/events/classifications";
import ClassificationSearchParameters from "../../../entities/events/searchParameters";
import ClassificationValidateParameters from "../../../entities/events/validateParameters";
import UserSearchParameters from "../../../entities/users/searchParameters";
import UserDto from "../../../entities/users/user";

export default interface IGateway {
    getClassifications(params: ClassificationSearchParameters): Promise<EventClassifications[]>;
    login(username: string, password: string) : Promise<UserDto>;
    createUser(user: UserDto) : Promise<void>;
    recoverPassword(mail: string, recoverUrl: string): Promise<void>;
    changePassword(mail: string, userName: string, password: string): Promise<void>;
    getUsers(params: UserSearchParameters) : Promise<UserDto[]>;
    acceptClassifications(params: ClassificationValidateParameters): Promise<void>;
    declineClassifications(params: ClassificationValidateParameters): Promise<void>;
}