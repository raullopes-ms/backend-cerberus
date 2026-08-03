import { PrismaSetoresRepository } from "../../repositories/prisma/prisma-setores-repositories";
import { DeleteSetorUseCase } from "../delete-setor-use-case";

export function makeDeleteSetorUseCase() {
    const setoresRepository = new PrismaSetoresRepository();
    const deleteSetorUseCase = new DeleteSetorUseCase(setoresRepository);
    return deleteSetorUseCase;
}
