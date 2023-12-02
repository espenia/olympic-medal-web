export default interface IRepository<T> {
    getOneAsync(...args: any[]): Promise<T>;
    deleteAsync(...args: any[]): Promise<void>;
    putAsync(...args: any[]): Promise<void>;
    getAsync(...args: any[]): Promise<T[]>;
    createAsync(a: T): Promise<void>;
}