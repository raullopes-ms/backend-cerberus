import { PrismaSetoresRepository } from "../../repositories/prisma/prisma-setores-repositories";
import { UpdateSetorUseCase } from "../update-setor-use-case";

export function makeUpdateSetorUseCase() {
    const setoresRepository = new PrismaSetoresRepository();
    const updateSetorUseCase = new UpdateSetorUseCase(setoresRepository);
    return updateSetorUseCase;
}
