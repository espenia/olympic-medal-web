import CredentialDto from "../../../entities/credentials/credential";
import UserDto from "../../../entities/users/user";
import IGateway from "../interfaces/gateway";
import axios, {AxiosRequestConfig} from "axios";
import ApiGatewayRequestError from "./exceptions";
import {Service} from "typedi";
import UserSearchParameters from "../../../entities/users/searchParameters";

@Service('apigateway')
export default class ApiGateway implements IGateway {
    private username?: string;
    private password?: string;
    private credential?: CredentialDto;
    private apiBaseUrl : string;

    /**
     *
     */
    constructor() {
        // si el backend esta corriendo en un contenedor de docker, 
        // usar 'springboot' o el nombre del servicio en el docker compose
        // sino, cambiarlo por 'localhost'
        this.apiBaseUrl = "http://localhost:8080";
    }

    async getUsers(params: UserSearchParameters): Promise<UserDto[]> {
        const response = await axios({
            url: this.apiBaseUrl + "/athletes",
            headers: {
                'X-Auth-Token': 'Bearer ' + this.credential?.payload
            },
            params : {
                "first_name": params.firstName,
                "last_name": params.lastName
            }
        });
        return response.data;
    }

    async createUser(user : UserDto) {
        const config = this.signUpAxiosRequestConfig("/auth/signup");

        config.data = {
            "user_name": user.username,
            "password": user.password,
            "mail": user.email,
            "first_name": user.firstName,
            "last_name": user.lastName,
            "birth_date": user.birthdate?.toISOString()
        };

        const response = await axios(config);
    }

    async login(username: string, password: string) {
        this.username = username;
        this.password = password;
        await this.getCredentials();
        const user = new UserDto();
        user.username = username;
        user.password = password;
        return user;
    }

    async changePassword(mail: string, userName: string, password: string): Promise<void> {
        const response = await axios({
            method: 'put',
            url: this.apiBaseUrl + "/auth/password/" + mail,
            headers: {"Content-Type": "application/json"},
            data: {
                password: password,
                user_name: userName
            }
        });

        if (response.status != 200) {
            throw new ApiGatewayRequestError("Status error. Expected 200 got " + response.status + ".");
        }
        return Promise.resolve();
    }

    async recoverPassword(mail: string, recoverUrl: string): Promise<void> {
        const response = await axios({
            method: 'post',
            url: this.apiBaseUrl + "/auth/recovery",
            headers: {"Content-Type": "application/json"},
            data: {
                mail: mail,
                redirect_url: recoverUrl
            }
        });

        if (response.status != 200) {
            throw new ApiGatewayRequestError("Status error. Expected 200 got " + response.status + ".");
        }
        return Promise.resolve();
    }

    private async getCredentials() {
        const response = await axios({
            method: 'post',
            url: this.apiBaseUrl + "/auth/login",
            headers: {"Content-Type": "application/json"},
            data: {
                user_name: this.username,
                password: this.password
            }
        });

        if (response.status != 200) {
            throw new ApiGatewayRequestError("Status error. Expected 200 got " + response.status + ".");
        }
        
        this.credential = new CredentialDto();
        this.credential.payload = response.data["token"];
    };

    private signUpAxiosRequestConfig( endpoint: string) : AxiosRequestConfig {
        return {
            method: 'post',
            url: this.apiBaseUrl + endpoint,
        };
    }

}