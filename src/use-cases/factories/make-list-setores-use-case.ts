import { PrismaSetoresRepository } from "../../repositories/prisma/prisma-setores-repositories";
import { ListSetoresUseCase } from "../list-setores-use-case";

export function makeListSetoresUseCase() {
    const setoresRepository = new PrismaSetoresRepository();
    const listSetoresUseCase = new ListSetoresUseCase(setoresRepository);
    return listSetoresUseCase;
}
