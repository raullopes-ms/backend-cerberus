export class SetorNotFoundError extends Error {
    constructor() {
        super("Setor não encontrado.");
    }
}
