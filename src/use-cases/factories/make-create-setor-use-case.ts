import { PrismaSetoresRepository } from "../../repositories/prisma/prisma-setores-repositories";
import { CreateSetorUseCase } from "../create-setor-use-case";

export function makeCreateSetorUseCase() {
    const setoresRepository = new PrismaSetoresRepository();
    const createSetorUseCase = new CreateSetorUseCase(setoresRepository);
    return createSetorUseCase;
}
