import { ChamadosRepository, ChamadoWithRelations } from "../repositories/chamados-repositories";
import { ChamadoNotFoundError } from "./errors/chamadoNotFound";

interface GetChamadoUseCaseRequest {
    id: number;
}
interface GetChamadoUseCaseResponse {
    chamado: ChamadoWithRelations;
}
export class GetChamadoUseCase {
    constructor(private chamadosRepository: ChamadosRepository) {}
    async execute({ id }: GetChamadoUseCaseRequest): Promise<GetChamadoUseCaseResponse> {
        const chamado = await this.chamadosRepository.findById(id);
        if (!chamado) {
            throw new ChamadoNotFoundError();
        }
        return { chamado };
    }
}
