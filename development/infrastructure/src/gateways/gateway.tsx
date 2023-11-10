import CredentialDto from "../../../entities/credentials/credential";
import UserDto from "../../../entities/users/user";
import IGateway from "../interfaces/gateway";
import axios, { AxiosRequestConfig } from "axios";
import ApiGatewayRequestError from "./exceptions";
import { Service } from "typedi";

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
        this.apiBaseUrl = "http://springboot:8080";
    }

    async createUser(user : UserDto) {
        const config = this.baseAxiosRequestConfig("post", "/auth/signup");
        
        config.data = {
            "user_name": user.username,
            "password": user.password,
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

    private baseAxiosRequestConfig(method: string, endpoint: string) : AxiosRequestConfig {
        return {
            method: method,
            url: this.apiBaseUrl + endpoint,
            headers: { 'X-Auth-Token': 'Bearer ' + this.credential?.payload }
        };
    }
}