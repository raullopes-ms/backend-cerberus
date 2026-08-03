import { PrismaAssuntosRepository } from "../../repositories/prisma/prisma-assuntos-repositories";
import { PrismaSetoresRepository } from "../../repositories/prisma/prisma-setores-repositories";
import { CreateAssuntoUseCase } from "../create-assunto-use-case";

export function makeCreateAssuntoUseCase() {
    const assuntosRepository = new PrismaAssuntosRepository();
    const setoresRepository = new PrismaSetoresRepository();
    const createAssuntoUseCase = new CreateAssuntoUseCase(assuntosRepository, setoresRepository);
    return createAssuntoUseCase;
}
