export class AssuntoNotFoundError extends Error {
    constructor() {
        super("Assunto não encontrado.");
    }
}
