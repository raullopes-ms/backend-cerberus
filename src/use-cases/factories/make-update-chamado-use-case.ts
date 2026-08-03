import { PrismaChamadosRepository } from "../../repositories/prisma/prisma-chamados-repositories";
import { UpdateChamadoUseCase } from "../update-chamado-use-case";

export function makeUpdateChamadoUseCase() {
    const chamadosRepository = new PrismaChamadosRepository();
    const updateChamadoUseCase = new UpdateChamadoUseCase(chamadosRepository);
    return updateChamadoUseCase;
}
