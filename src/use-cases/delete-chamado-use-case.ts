import { ChamadosRepository } from "../repositories/chamados-repositories";
import { ChamadoNotFoundError } from "./errors/chamadoNotFound";

interface DeleteChamadoUseCaseRequest {
    id: number;
}
export class DeleteChamadoUseCase {
    constructor(private chamadosRepository: ChamadosRepository) {}
    async execute({ id }: DeleteChamadoUseCaseRequest): Promise<void> {
        const existingChamado = await this.chamadosRepository.findById(id);
        if (!existingChamado) {
            throw new ChamadoNotFoundError();
        }
        await this.chamadosRepository.delete(id);
    }
}
