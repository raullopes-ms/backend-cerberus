import { PrismaCargosRepository } from "../../repositories/prisma/prisma-cargos-repositories";
import { ListCargosUseCase } from "../list-cargos-use-case";

export function makeListCargosUseCase() {
    const cargosRepository = new PrismaCargosRepository();
    const listCargosUseCase = new ListCargosUseCase(cargosRepository);
    return listCargosUseCase;
}
