import { PrismaCargosRepository } from "../../repositories/prisma/prisma-cargos-repositories";
import { DeleteCargoUseCase } from "../delete-cargo-use-case";

export function makeDeleteCargoUseCase() {
    const cargosRepository = new PrismaCargosRepository();
    const deleteCargoUseCase = new DeleteCargoUseCase(cargosRepository);
    return deleteCargoUseCase;
}
