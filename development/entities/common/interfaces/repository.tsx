export default interface IRepository<T> {
    getAsync(...params : unknown[]): Promise<T[]>;
    createAsync(a: T): Promise<void>;
}