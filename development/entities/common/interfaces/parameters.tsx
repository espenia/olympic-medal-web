import { UUID } from "crypto";

export default class Parameters<T> {
    id?: UUID;
    searchText?: string;
}