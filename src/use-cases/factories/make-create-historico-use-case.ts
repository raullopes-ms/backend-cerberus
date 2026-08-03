import { PrismaHistoricosRepository } from "../../repositories/prisma/prisma-historicos-repositories";
import { PrismaChamadosRepository } from "../../repositories/prisma/prisma-chamados-repositories";
import { CreateHistoricoUseCase } from "../create-historico-use-case";

export function makeCreateHistoricoUseCase() {
    const historicosRepository = new PrismaHistoricosRepository();
    const chamadosRepository = new PrismaChamadosRepository();
    const createHistoricoUseCase = new CreateHistoricoUseCase(historicosRepository, chamadosRepository);
    return createHistoricoUseCase;
}
