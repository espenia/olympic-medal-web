import ClassificationValidateParameters from "../../events/validateParameters";
import Parameters from "./parameters"

export default interface IRepository<T> {
    deleteAsync(params: Parameters<T>): Promise<void>;
    putAsync(params: Parameters<T>): Promise<void>;
    getAsync(params : Parameters<T>): Promise<T[]>;
    createAsync(a: T): Promise<void>;
}