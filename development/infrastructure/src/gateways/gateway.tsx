import UserDto from "../../../entities/users/user";
import IGateway from "../interfaces/gateway";
import axios, {AxiosRequestConfig} from "axios";
import ApiGatewayRequestError from "./exceptions";
import {Service} from "typedi";
import {GlobalRef} from "../../globalRef";
import EventDto from "../../../entities/events/event";
import EventClassificationDto from "../../../entities/events/classifications";

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
        return Promise.resolve();
    }
    async acceptClassifications(idClassification: string): Promise<void> {
        const config = this.getAxiosConfig("put", "/api/classification/" + idClassification + "/accept", [], []);
        const response = await axios(config);

        if (response.status != 200) {
            throw new ApiGatewayRequestError("Status error. Expected 200 got " + response.status + ".");
        }
        return Promise.resolve();
    }

    async declineClassifications(idClassification: string): Promise<void> {
        const config = this.getAxiosConfig("delete", "/api/classification/" + idClassification + "/reject", [], []);
        const response = await axios(config);

        if (response.status != 200) {
            throw new ApiGatewayRequestError("Status error. Expected 200 got " + response.status + ".");
        }
        return Promise.resolve();
    }

    async getClassifications(...args: any[]): Promise<EventClassificationDto[]> {
        const config = this.getAxiosConfig("get", "/api/classifications/search", ["athlete_first_name", "athlete_last_name", "user_id"], args);
        const response = await axios(config);

        const classifications = response.data.results.map((x: {[k: string]: any}) =>
        {
            const classification = new EventClassificationDto();
            classification.id = Number.parseInt(x.id);
            classification.event_id = Number.parseInt(x.event.id);
            classification.event_name = x.event.name;
            classification.event = x.event as EventDto;
            classification.position = Number.parseInt(x.position);
            classification.duration_hours = Number.parseInt(x.duration_hours);
            classification.duration_minutes = Number.parseInt(x.duration_minutes);
            classification.duration_seconds = Number.parseInt(x.duration_seconds);
            classification.athlete_first_name = x.athlete_first_name;
            classification.athlete_last_name = x.athlete_last_name;
            return classification;
        });

        return classifications;
    }

    async getEvents(...args: any[]): Promise<EventDto[]> {

        const config = this.getAxiosConfig("get", "/api/events/search", ["id", "name", "category", "location", "edition", "date_from", "date_to", "athlete_first_name", "athlete_last_name", "athlete_country"], args);

        const response = await axios(config);

        type ApiClassification = {
            id: string;
            duration_hours: string;
            duration_minutes: string;
            duration_seconds: string;
            athlete: null | string;
            event: null | string;
            position: string;
            athlete_first_name: string;
            athlete_last_name: string;
          };
          
          type ApiEvent = {
            id: string;
            name: string;
            edition: string;
            participants_count: string;
            category: string;
            distance: string;
            location: string;
            description: string;
            date: string;
            classifications: ApiClassification[];
            official_site: string;
          };

        const events = response.data.results.map((x: ApiEvent) =>
            { 
                const event = new EventDto();
                event.id = Number.parseInt(x.id);
                event.name = x.name;
                event.category = x.category;
                event.date = new Date(x.date);
                event.description = x.description;
                event.distance = Number.parseInt(x.distance);
                event.edition = Number.parseInt(x.edition);
                event.location = x.location;
                event.officialSite = x.official_site;
                event.participantsCount = Number.parseInt(x.participants_count);
                event.classifications = x.classifications?.map(x => {
                    const classification = new EventClassificationDto();
                    classification.athlete_first_name = x.athlete_first_name;
                    classification.athlete_last_name = x.athlete_last_name;
                    classification.duration_hours = Number.parseInt(x.duration_hours);
                    classification.duration_minutes = Number.parseInt(x.duration_minutes);
                    classification.duration_seconds = Number.parseInt(x.duration_seconds);
                    classification.event_id = x.event ? Number.parseInt(x.event) : 0;
                    classification.position = Number.parseInt(x.position);
                    classification.id = Number.parseInt(x.id);
                    return classification;
                })
                return event;
            });

        return events;
    }

    async getUser(): Promise<UserDto> {
        const config = {
            method: 'get',
            url: this.apiBaseUrl + "/api/athlete",
            headers: this.getEntries(['Content-Type', 'Accept', 'X-Auth-Token'], 
                                     ['application/json', 'application/json', `Bearer ${this.token.value}`]),
            withCredentials: true
        };

        const response = await axios(config);

        return {
            id: Number.parseInt(response.data.id),
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            country: response.data.country,
            birthdate: new Date(response.data.birth_date),
            goldMedals: Number.parseInt(response.data.gold_medals),
            silverMedals: Number.parseInt(response.data.silver_medals),
            bronzeMedals: Number.parseInt(response.data.bronze_medals),
            username: response.data.user_name,
            email: response.data.user_mail
        };
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

        const users = response.data.results.map((x: {[k: string]: any}) =>
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

    async changePassword(mail: string, password: string): Promise<void> {
        const response = await axios({
            method: 'put',
            url: this.apiBaseUrl + "/auth/password/" + mail,
            headers: {"Content-Type": "application/json"},
            data: {
                password: password,
                // user_name: userName
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

    private getAxiosConfig(method: "post" | "get" | "put" | "delete", endpoint: string, parameterNames: string[], parameterValues: any[]) : AxiosRequestConfig {
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