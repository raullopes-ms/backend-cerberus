import { PrismaCargosRepository } from "../../repositories/prisma/prisma-cargos-repositories";
import { UpdateCargoUseCase } from "../update-cargo-use-case";

export function makeUpdateCargoUseCase() {
    const cargosRepository = new PrismaCargosRepository();
    const updateCargoUseCase = new UpdateCargoUseCase(cargosRepository);
    return updateCargoUseCase;
}
