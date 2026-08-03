import { PrismaHistoricosRepository } from "../../repositories/prisma/prisma-historicos-repositories";
import { UpdateHistoricoUseCase } from "../update-historico-use-case";

export function makeUpdateHistoricoUseCase() {
    const historicosRepository = new PrismaHistoricosRepository();
    const updateHistoricoUseCase = new UpdateHistoricoUseCase(historicosRepository);
    return updateHistoricoUseCase;
}
