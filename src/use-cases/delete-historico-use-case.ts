import { HistoricosRepository } from "../repositories/historicos-repositories";
import { HistoricoNotFoundError } from "./errors/historicoNotFound";

interface DeleteHistoricoUseCaseRequest {
    id: number;
}
export class DeleteHistoricoUseCase {
    constructor(private historicosRepository: HistoricosRepository) {}
    async execute({ id }: DeleteHistoricoUseCaseRequest): Promise<void> {
        const existingHistorico = await this.historicosRepository.findById(id);
        if (!existingHistorico) {
            throw new HistoricoNotFoundError();
        }
        await this.historicosRepository.delete(id);
    }
}
