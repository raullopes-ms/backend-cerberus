export class CargoAlreadyExistsError extends Error {
    constructor() {
        super("Já existe um cargo com este nome.");
    }
}
