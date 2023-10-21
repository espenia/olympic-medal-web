export default interface IUseCase<T> {
    handle() : Promise<T>;
}