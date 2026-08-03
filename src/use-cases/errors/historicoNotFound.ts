export class HistoricoNotFoundError extends Error {
    constructor() {
        super("Histórico não encontrado.");
    }
}
