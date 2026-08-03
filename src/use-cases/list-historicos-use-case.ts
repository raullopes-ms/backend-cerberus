import { HistoricosRepository } from "../repositories/historicos-repositories";
import { HistoricoWithUsuario } from "../repositories/historicos-repositories";

interface ListHistoricosUseCaseRequest {
    chamadoId?: number | undefined;
}
interface ListHistoricosUseCaseResponse {
    historicos: HistoricoWithUsuario[];
}
export class ListHistoricosUseCase {
    constructor(private historicosRepository: HistoricosRepository) {}
    async execute({ chamadoId }: ListHistoricosUseCaseRequest = {}): Promise<ListHistoricosUseCaseResponse> {
        const historicos = chamadoId
            ? await this.historicosRepository.findManyByChamadoId(chamadoId)
            : await this.historicosRepository.findMany();
        return { historicos };
    }
}
