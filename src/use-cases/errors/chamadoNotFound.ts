export class ChamadoNotFoundError extends Error {
    constructor() {
        super("Chamado não encontrado.");
    }
}
