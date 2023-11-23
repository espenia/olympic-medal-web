import Parameters from "./parameters"

export default interface IRepository<T> {
    getAsync(params : Parameters<T>): Promise<T[]>;
    createAsync(a: T): Promise<void>;

}