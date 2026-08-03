import { PrismaSetoresRepository } from "../../repositories/prisma/prisma-setores-repositories";
import { GetSetorUseCase } from "../get-setor-use-case";

export function makeGetSetorUseCase() {
    const setoresRepository = new PrismaSetoresRepository();
    const getSetorUseCase = new GetSetorUseCase(setoresRepository);
    return getSetorUseCase;
}
