import { ChamadosRepository, ChamadoWithRelations, ChamadosVisibilityFilter } from "../repositories/chamados-repositories";

interface ListChamadosUseCaseRequest {
    /** Ausente para administradores, que enxergam a base inteira. */
    visibility?: ChamadosVisibilityFilter | undefined;
}
interface ListChamadosUseCaseResponse {
    chamados: ChamadoWithRelations[];
}
export class ListChamadosUseCase {
    constructor(private chamadosRepository: ChamadosRepository) {}
    async execute({ visibility }: ListChamadosUseCaseRequest = {}): Promise<ListChamadosUseCaseResponse> {
        const chamados = await this.chamadosRepository.findMany(visibility);
        return { chamados };
    }
}
