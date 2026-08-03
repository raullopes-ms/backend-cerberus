import { PrismaHistoricosRepository } from "../../repositories/prisma/prisma-historicos-repositories";
import { DeleteHistoricoUseCase } from "../delete-historico-use-case";

export function makeDeleteHistoricoUseCase() {
    const historicosRepository = new PrismaHistoricosRepository();
    const deleteHistoricoUseCase = new DeleteHistoricoUseCase(historicosRepository);
    return deleteHistoricoUseCase;
}
