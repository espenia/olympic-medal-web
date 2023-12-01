import UserDto from "../../../entities/users/user";
import IGateway from "../interfaces/gateway";
import axios, {AxiosRequestConfig} from "axios";
import ApiGatewayRequestError from "./exceptions";
import {Service} from "typedi";
import { GlobalRef } from "../../globalRef";
import EventDto from "../../../entities/events/event";

@Service({ id: 'apigateway', transient: false, global: true, eager: true })
export default class ApiGateway implements IGateway {
    private username = new GlobalRef<string>('username');
    private password = new GlobalRef<string>('password');
    private token = new GlobalRef<string>('token');
    // si el backend esta corriendo en un contenedor de docker, 
    // usar 'springboot' o el nombre del servicio en el docker compose
    // sino, cambiarlo por 'localhost'
    private apiBaseUrl = "http://springboot:8080";
    //private apiBaseUrl = "http://localhost:8080";

    async createEvent(event: EventDto): Promise<void> {
        const config = this.getAxiosConfig("post", "/backoffice/event", [], []);
        config.data = this.getEntries(["name", "category", "date", "description", "distance", "edition", "location", "official_site", "participant_count", "classifications"],
                                      [event.name, event.category, event.date?.toISOString(), event.description, event.distance, event.edition, event.location, event.officialSite, event.participantsCount, event.classifications])

        const response = await axios(config);
    }

    async getEvents(...args: any[]): Promise<EventDto[]> {
        const config = this.getAxiosConfig("get", "/api/events/search?", ["id", "name", "category", "location", "date_from", "date_to", "edition", "athlete_first_name", "athlete_last_name", "athlete_country"], args);

        const response = await axios(config);

        const events = response.data.results.map((x: {[k: string]: string}) =>
            { 
                const event = new EventDto();
                event.id = Number.parseInt(x.id);
                event.name = x.name;
                event.category = x.country;
                event.date = new Date(x.date);
                event.description = x.description;
                event.distance = Number.parseInt(x.distance);
                event.edition = Number.parseInt(x.edition);
                event.location = x.location;
                event.officialSite = x.official_site;
                event.participantsCount = Number.parseInt(x.participants_count);
                return event;
            });

        return events;
    }

    async getUsers(...args: any[]): Promise<UserDto[]> {
        const keyValuePairs = args.at(0) ? [["id"], [args.at(0)]] : [["first_name", "last_name", "mail"], args.slice(1)]
        const params = args.some(x => x) ? "?" + new URLSearchParams(this.getEntries(keyValuePairs[0], keyValuePairs[1])) : "";
        const config = {
            method: 'get',
            url: this.apiBaseUrl + "/api/athletes" + params,
            headers: this.getEntries(['Content-Type', 'Accept', 'X-Auth-Token'], 
                                     ['application/json', 'application/json', `Bearer ${this.token.value}`]),
            withCredentials: true
        };

        const response = await axios(config);

        const users = response.data.results.map((x: {[k: string]: string}) => 
            { 
                const user = new UserDto();
                user.id = Number.parseInt(x.id);
                user.firstName = x.first_name;
                user.lastName = x.last_name;
                user.country = x.country;
                user.birthdate = new Date(x.birth_date);
                user.goldMedals = Number.parseInt(x.gold_medals);
                user.silverMedals = Number.parseInt(x.silver_medals);
                user.bronzeMedals = Number.parseInt(x.bronze_medals);
                user.username = x.user_name;
                user.email = x.user_mail;
                return user;
            });

        return users;
    }

    async createUser(user : UserDto) {
        const config = this.signUpAxiosRequestConfig("/auth/signup");

        config.data = {
            "user_name": user.username,
            "password": user.password,
            "mail": user.email,
            "first_name": user.firstName,
            "last_name": user.lastName,
            "birth_date": user.birthdate?.toISOString(),
            "is_athlete": user.isAthlete,
            "country": user.country
        };

        const response = await axios(config);
    }

    async login(username: string, password: string) {
        this.username.value = username;
        this.password.value = password;
        this.token.value = await this.getCredentials();

        const config = this.getAxiosConfig("get", "/api/athlete", [], []);
        const result = await axios(config);

        const user = new UserDto();
        user.id = Number.parseInt(result.data.id);
        user.firstName = result.data.first_name;
        user.lastName = result.data.last_name;
        user.country = result.data.country;
        user.birthdate = new Date(result.data.birth_date);
        user.goldMedals = Number.parseInt(result.data.gold_medals);
        user.silverMedals = Number.parseInt(result.data.silver_medals);
        user.bronzeMedals = Number.parseInt(result.data.bronze_medals);
        user.username = result.data.user_name;
        user.email = result.data.user_mail;

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

    private async getCredentials() : Promise<string> {
        const response = await axios({
            method: 'post',
            url: this.apiBaseUrl + "/auth/login",
            headers: this.getEntries(["Content-Type"], ["application/json"]),
            data: this.getEntries(["user_name", "password"], [this.username.value, this.password.value])
        });

        return response.data.token;
    };

    private signUpAxiosRequestConfig( endpoint: string) : AxiosRequestConfig {
        return {
            method: 'post',
            url: this.apiBaseUrl + endpoint,
        };
    }

    private zip(keys: string[], values: any[]) : Map<string, any> {
        return keys.reduce((map, key, index) => {
            if (values.at(index)) {
                map.set(key, values.at(index));
            }
            return map;
        }, new Map());
    }

    private getEntries(keys: string[], values: any[]) {
        return Object.fromEntries(this.zip(keys, values));
    }

    private getUrlWithParameters(endpoint: string, parameterNames: string[], parameterValues: any[]) {
        const params = parameterValues.some(x => x) ? "?" + new URLSearchParams(this.getEntries(parameterNames, parameterValues)) : "";

        return this.apiBaseUrl + endpoint + params;
    }

    private getAxiosConfig(method: "post" | "get" | "put", endpoint: string, parameterNames: string[], parameterValues: any[]) : AxiosRequestConfig {
        const config = {
            method: method,
            url: this.getUrlWithParameters(endpoint, parameterNames, parameterValues),
            headers: this.getEntries(['Content-Type', 'Accept', 'X-Auth-Token'], 
                                     ['application/json', 'application/json', `Bearer ${this.token.value}`]),
            withCredentials: true
        };

        return config;
    }
}