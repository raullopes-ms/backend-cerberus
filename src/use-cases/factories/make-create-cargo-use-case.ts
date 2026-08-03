import { PrismaCargosRepository } from "../../repositories/prisma/prisma-cargos-repositories";
import { CreateCargoUseCase } from "../create-cargo-use-case";

export function makeCreateCargoUseCase() {
    const cargosRepository = new PrismaCargosRepository();
    const createCargoUseCase = new CreateCargoUseCase(cargosRepository);
    return createCargoUseCase;
}
