import { PrismaChamadosRepository } from "../../repositories/prisma/prisma-chamados-repositories";
import { DeleteChamadoUseCase } from "../delete-chamado-use-case";

export function makeDeleteChamadoUseCase() {
    const chamadosRepository = new PrismaChamadosRepository();
    const deleteChamadoUseCase = new DeleteChamadoUseCase(chamadosRepository);
    return deleteChamadoUseCase;
}
