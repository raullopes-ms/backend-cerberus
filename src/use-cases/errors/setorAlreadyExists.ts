export class SetorAlreadyExistsError extends Error {
    constructor() {
        super("Já existe um setor com este nome.");
    }
}
