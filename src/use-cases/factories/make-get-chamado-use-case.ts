import { PrismaChamadosRepository } from "../../repositories/prisma/prisma-chamados-repositories";
import { GetChamadoUseCase } from "../get-chamado-use-case";

export function makeGetChamadoUseCase() {
    const chamadosRepository = new PrismaChamadosRepository();
    const getChamadoUseCase = new GetChamadoUseCase(chamadosRepository);
    return getChamadoUseCase;
}
