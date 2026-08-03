export class CargoNotFoundError extends Error {
    constructor() {
        super("Cargo não encontrado.");
    }
}
