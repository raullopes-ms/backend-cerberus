export class AssuntoAlreadyExistsError extends Error {
    constructor() {
        super("Já existe um assunto com este nome.");
    }
}
