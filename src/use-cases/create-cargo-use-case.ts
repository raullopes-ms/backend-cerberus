import { CargosRepository } from "../repositories/cargos-repositories";
import { Cargo } from "../../generated/prisma/client";
import { CargoAlreadyExistsError } from "./errors/cargoAlreadyExists";

interface CreateCargoUseCaseRequest {
    nome: string;
}
interface CreateCargoUseCaseResponse {
    cargo: Cargo;
}
export class CreateCargoUseCase {
    constructor(private cargosRepository: CargosRepository) {}
    async execute({ nome }: CreateCargoUseCaseRequest): Promise<CreateCargoUseCaseResponse> {
        const cargoAlreadyExists = await this.cargosRepository.findByNome(nome);
        if (cargoAlreadyExists) {
            throw new CargoAlreadyExistsError();
        }
        const cargo = await this.cargosRepository.create({ nome });
        return { cargo };
    }
}
