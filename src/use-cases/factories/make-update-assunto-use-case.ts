import { PrismaAssuntosRepository } from "../../repositories/prisma/prisma-assuntos-repositories";
import { PrismaSetoresRepository } from "../../repositories/prisma/prisma-setores-repositories";
import { UpdateAssuntoUseCase } from "../update-assunto-use-case";

export function makeUpdateAssuntoUseCase() {
    const assuntosRepository = new PrismaAssuntosRepository();
    const setoresRepository = new PrismaSetoresRepository();
    const updateAssuntoUseCase = new UpdateAssuntoUseCase(assuntosRepository, setoresRepository);
    return updateAssuntoUseCase;
}
