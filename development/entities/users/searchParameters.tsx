import Parameters from '../common/interfaces/parameters'
import UserDto from './user'

export default class UserSearchParameters extends Parameters<UserDto> {
    firstName?: string;
    lastName?: string;
}