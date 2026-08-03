import { HistoricosRepository } from "../repositories/historicos-repositories";
import { HistoricoWithUsuario } from "../repositories/historicos-repositories";
import { HistoricoNotFoundError } from "./errors/historicoNotFound";

interface GetHistoricoUseCaseRequest {
    id: number;
}
interface GetHistoricoUseCaseResponse {
    historico: HistoricoWithUsuario;
}
export class GetHistoricoUseCase {
    constructor(private historicosRepository: HistoricosRepository) {}
    async execute({ id }: GetHistoricoUseCaseRequest): Promise<GetHistoricoUseCaseResponse> {
        const historico = await this.historicosRepository.findById(id);
        if (!historico) {
            throw new HistoricoNotFoundError();
        }
        return { historico };
    }
}
