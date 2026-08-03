import { PrismaAssuntosRepository } from "../../repositories/prisma/prisma-assuntos-repositories";
import { UpdateAssuntoUseCase } from "../update-assunto-use-case";

export function makeUpdateAssuntoUseCase() {
    const assuntosRepository = new PrismaAssuntosRepository();
    const updateAssuntoUseCase = new UpdateAssuntoUseCase(assuntosRepository);
    return updateAssuntoUseCase;
}
