import { CargosRepository } from "../repositories/cargos-repositories";
import { Cargo } from "../../generated/prisma/client";
import { CargoNotFoundError } from "./errors/cargoNotFound";

interface GetCargoUseCaseRequest {
    id: number;
}
interface GetCargoUseCaseResponse {
    cargo: Cargo;
}
export class GetCargoUseCase {
    constructor(private cargosRepository: CargosRepository) {}
    async execute({ id }: GetCargoUseCaseRequest): Promise<GetCargoUseCaseResponse> {
        const cargo = await this.cargosRepository.findById(id);
        if (!cargo) {
            throw new CargoNotFoundError();
        }
        return { cargo };
    }
}
