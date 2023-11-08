export default class ApiGatewayRequestError extends Error {
    constructor(msg: string) {
        super(msg);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ApiGatewayRequestError.prototype);
    }

    getMessage() {
        return this.message;
    }
}