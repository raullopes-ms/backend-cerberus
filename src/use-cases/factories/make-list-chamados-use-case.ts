import { PrismaChamadosRepository } from "../../repositories/prisma/prisma-chamados-repositories";
import { ListChamadosUseCase } from "../list-chamados-use-case";

export function makeListChamadosUseCase() {
    const chamadosRepository = new PrismaChamadosRepository();
    const listChamadosUseCase = new ListChamadosUseCase(chamadosRepository);
    return listChamadosUseCase;
}
