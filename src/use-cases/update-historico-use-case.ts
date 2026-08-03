import { HistoricosRepository } from "../repositories/historicos-repositories";
import { Prisma } from "../../generated/prisma/client";
import { HistoricoWithUsuario } from "../repositories/historicos-repositories";
import { HistoricoNotFoundError } from "./errors/historicoNotFound";

interface UpdateHistoricoUseCaseRequest {
    id: number;
    descricao?: string | undefined;
}
interface UpdateHistoricoUseCaseResponse {
    historico: HistoricoWithUsuario;
}
export class UpdateHistoricoUseCase {
    constructor(private historicosRepository: HistoricosRepository) {}
    async execute({ id, descricao }: UpdateHistoricoUseCaseRequest): Promise<UpdateHistoricoUseCaseResponse> {
        const existingHistorico = await this.historicosRepository.findById(id);
        if (!existingHistorico) {
            throw new HistoricoNotFoundError();
        }
        const data: Prisma.HistoricoUpdateInput = {};
        if (descricao !== undefined) data.descricao = descricao;
        const historico = await this.historicosRepository.update(id, data);
        return { historico };
    }
}
