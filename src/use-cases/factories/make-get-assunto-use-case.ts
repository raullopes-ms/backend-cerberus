import { PrismaAssuntosRepository } from "../../repositories/prisma/prisma-assuntos-repositories";
import { GetAssuntoUseCase } from "../get-assunto-use-case";

export function makeGetAssuntoUseCase() {
    const assuntosRepository = new PrismaAssuntosRepository();
    const getAssuntoUseCase = new GetAssuntoUseCase(assuntosRepository);
    return getAssuntoUseCase;
}
