import { PrismaAssuntosRepository } from "../../repositories/prisma/prisma-assuntos-repositories";
import { ListAssuntosUseCase } from "../list-assuntos-use-case";

export function makeListAssuntosUseCase() {
    const assuntosRepository = new PrismaAssuntosRepository();
    const listAssuntosUseCase = new ListAssuntosUseCase(assuntosRepository);
    return listAssuntosUseCase;
}
