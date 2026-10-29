// Equivalente a IllegalArgumentException de Java
export class IllegalArgumentError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "IllegalArgumentError";
    }
}
