import { CargosRepository } from "../repositories/cargos-repositories";
import { CargoNotFoundError } from "./errors/cargoNotFound";

interface DeleteCargoUseCaseRequest {
    id: number;
}
export class DeleteCargoUseCase {
    constructor(private cargosRepository: CargosRepository) {}
    async execute({ id }: DeleteCargoUseCaseRequest): Promise<void> {
        const existingCargo = await this.cargosRepository.findById(id);
        if (!existingCargo) {
            throw new CargoNotFoundError();
        }
        await this.cargosRepository.delete(id);
    }
}
