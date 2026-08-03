import { HistoricosRepository } from "../repositories/historicos-repositories";
import { HistoricoWithUsuario } from "../repositories/historicos-repositories";
import { ChamadosRepository } from "../repositories/chamados-repositories";
import { ChamadoNotFoundError } from "./errors/chamadoNotFound";

interface CreateHistoricoUseCaseRequest {
    descricao: string;
    chamadoId: number;
    usuarioId: number;
}
interface CreateHistoricoUseCaseResponse {
    historico: HistoricoWithUsuario;
}
export class CreateHistoricoUseCase {
    constructor(
        private historicosRepository: HistoricosRepository,
        private chamadosRepository: ChamadosRepository,
    ) {}
    async execute({
        descricao,
        chamadoId,
        usuarioId,
    }: CreateHistoricoUseCaseRequest): Promise<CreateHistoricoUseCaseResponse> {
        const chamado = await this.chamadosRepository.findById(chamadoId);
        if (!chamado) {
            throw new ChamadoNotFoundError();
        }
        const historico = await this.historicosRepository.create({
            descricao,
            chamado: { connect: { id: chamadoId } },
            usuario: { connect: { id: usuarioId } },
        });
        return { historico };
    }
}
