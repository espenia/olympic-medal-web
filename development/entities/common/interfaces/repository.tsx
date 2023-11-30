export default interface IRepository<T> {
    getAsync(...args: any[]): Promise<T[]>;
    createAsync(a: T): Promise<void>;
}