import { PrismaAssuntosRepository } from "../../repositories/prisma/prisma-assuntos-repositories";
import { CreateAssuntoUseCase } from "../create-assunto-use-case";

export function makeCreateAssuntoUseCase() {
    const assuntosRepository = new PrismaAssuntosRepository();
    const createAssuntoUseCase = new CreateAssuntoUseCase(assuntosRepository);
    return createAssuntoUseCase;
}
