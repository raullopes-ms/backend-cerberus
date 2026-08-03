import { SetoresRepository } from "../repositories/setores-repositories";
import { Setor } from "../../generated/prisma/client";
import { SetorAlreadyExistsError } from "./errors/setorAlreadyExists";

interface CreateSetorUseCaseRequest {
    nome: string;
}
interface CreateSetorUseCaseResponse {
    setor: Setor;
}
export class CreateSetorUseCase {
    constructor(private setoresRepository: SetoresRepository) {}
    async execute({ nome }: CreateSetorUseCaseRequest): Promise<CreateSetorUseCaseResponse> {
        const setorAlreadyExists = await this.setoresRepository.findByNome(nome);
        if (setorAlreadyExists) {
            throw new SetorAlreadyExistsError();
        }
        const setor = await this.setoresRepository.create({ nome });
        return { setor };
    }
}
