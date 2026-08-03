import { PrismaChamadosRepository } from "../../repositories/prisma/prisma-chamados-repositories";
import { CreateChamadoUseCase } from "../create-chamado-use-case";

export function makeCreateChamadoUseCase() {
    const chamadosRepository = new PrismaChamadosRepository();
    const createChamadoUseCase = new CreateChamadoUseCase(chamadosRepository);
    return createChamadoUseCase;
}
