import { CargosRepository } from "../repositories/cargos-repositories";
import { Cargo } from "../../generated/prisma/client";

interface ListCargosUseCaseResponse {
    cargos: Cargo[];
}
export class ListCargosUseCase {
    constructor(private cargosRepository: CargosRepository) {}
    async execute(): Promise<ListCargosUseCaseResponse> {
        const cargos = await this.cargosRepository.findMany();
        return { cargos };
    }
}
