import { PrismaHistoricosRepository } from "../../repositories/prisma/prisma-historicos-repositories";
import { ListHistoricosUseCase } from "../list-historicos-use-case";

export function makeListHistoricosUseCase() {
    const historicosRepository = new PrismaHistoricosRepository();
    const listHistoricosUseCase = new ListHistoricosUseCase(historicosRepository);
    return listHistoricosUseCase;
}
