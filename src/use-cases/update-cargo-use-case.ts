import { CargosRepository } from "../repositories/cargos-repositories";
import { Cargo, Prisma } from "../../generated/prisma/client";
import { CargoNotFoundError } from "./errors/cargoNotFound";
import { CargoAlreadyExistsError } from "./errors/cargoAlreadyExists";

interface UpdateCargoUseCaseRequest {
    id: number;
    nome?: string | undefined;
    ativo?: boolean | undefined;
}
interface UpdateCargoUseCaseResponse {
    cargo: Cargo;
}
export class UpdateCargoUseCase {
    constructor(private cargosRepository: CargosRepository) {}
    async execute({ id, nome, ativo }: UpdateCargoUseCaseRequest): Promise<UpdateCargoUseCaseResponse> {
        const existingCargo = await this.cargosRepository.findById(id);
        if (!existingCargo) {
            throw new CargoNotFoundError();
        }
        if (nome && nome !== existingCargo.nome) {
            const cargoWithSameNome = await this.cargosRepository.findByNome(nome);
            if (cargoWithSameNome) {
                throw new CargoAlreadyExistsError();
            }
        }
        const data: Prisma.CargoUpdateInput = {};
        if (nome !== undefined) data.nome = nome;
        if (ativo !== undefined) data.ativo = ativo;
        const cargo = await this.cargosRepository.update(id, data);
        return { cargo };
    }
}
