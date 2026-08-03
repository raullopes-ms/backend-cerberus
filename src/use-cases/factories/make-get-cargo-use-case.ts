import { PrismaCargosRepository } from "../../repositories/prisma/prisma-cargos-repositories";
import { GetCargoUseCase } from "../get-cargo-use-case";

export function makeGetCargoUseCase() {
    const cargosRepository = new PrismaCargosRepository();
    const getCargoUseCase = new GetCargoUseCase(cargosRepository);
    return getCargoUseCase;
}
