import { PrismaHistoricosRepository } from "../../repositories/prisma/prisma-historicos-repositories";
import { GetHistoricoUseCase } from "../get-historico-use-case";

export function makeGetHistoricoUseCase() {
    const historicosRepository = new PrismaHistoricosRepository();
    const getHistoricoUseCase = new GetHistoricoUseCase(historicosRepository);
    return getHistoricoUseCase;
}
