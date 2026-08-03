import { PrismaAssuntosRepository } from "../../repositories/prisma/prisma-assuntos-repositories";
import { DeleteAssuntoUseCase } from "../delete-assunto-use-case";

export function makeDeleteAssuntoUseCase() {
    const assuntosRepository = new PrismaAssuntosRepository();
    const deleteAssuntoUseCase = new DeleteAssuntoUseCase(assuntosRepository);
    return deleteAssuntoUseCase;
}
